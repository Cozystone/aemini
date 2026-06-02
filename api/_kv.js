import { neon } from '@neondatabase/serverless';

let _sql = null;
let _tableReady = false;

function getSql() {
  if (!process.env.DATABASE_URL) return null;
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql;
}

async function ensureTable(sql) {
  if (_tableReady) return;
  await sql`CREATE TABLE IF NOT EXISTS kv (key TEXT PRIMARY KEY, value TEXT, expires_at BIGINT)`;
  _tableReady = true;
}

export async function kvGet(key) {
  const sql = getSql();
  if (!sql) return null;
  await ensureTable(sql);
  const rows = await sql`SELECT value, expires_at FROM kv WHERE key = ${key}`;
  if (!rows.length) return null;
  const { value, expires_at } = rows[0];
  if (expires_at && expires_at < Date.now()) return null;
  try { return JSON.parse(value); } catch { return value; }
}

export async function kvSet(key, value, exSeconds) {
  const sql = getSql();
  if (!sql) throw new Error('KV not configured');
  await ensureTable(sql);
  const str = JSON.stringify(value);
  const expiresAt = exSeconds ? Date.now() + exSeconds * 1000 : null;
  await sql`
    INSERT INTO kv (key, value, expires_at) VALUES (${key}, ${str}, ${expiresAt})
    ON CONFLICT (key) DO UPDATE SET value = ${str}, expires_at = ${expiresAt}
  `;
}

export function kvReady() {
  return !!process.env.DATABASE_URL;
}
