// Vercel KV REST API 래퍼 (패키지 없이 직접 호출)
const BASE = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

function headers() {
  return { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
}

export async function kvGet(key) {
  if (!BASE) return null;
  const res = await fetch(`${BASE}/get/${encodeURIComponent(key)}`, { headers: headers() });
  const data = await res.json();
  if (!data.result) return null;
  try { return JSON.parse(data.result); } catch { return data.result; }
}

export async function kvSet(key, value, exSeconds) {
  if (!BASE) throw new Error('KV not configured');
  const cmd = exSeconds
    ? ['set', key, JSON.stringify(value), 'ex', exSeconds]
    : ['set', key, JSON.stringify(value)];
  const res = await fetch(`${BASE}/pipeline`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify([cmd])
  });
  return res.ok;
}

export function kvReady() {
  return !!(BASE && TOKEN);
}
