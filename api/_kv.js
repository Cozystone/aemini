import { createClient } from 'redis';

let _clientPromise = null;

function getClient() {
  if (!process.env.REDIS_URL) return null;
  if (!_clientPromise) {
    const client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: false,
      },
    });
    client.on('error', () => { _clientPromise = null; });
    _clientPromise = client.connect().then(() => client).catch(() => { _clientPromise = null; return null; });
  }
  return _clientPromise;
}

export async function kvGet(key) {
  const client = await getClient();
  if (!client) return null;
  const val = await client.get(key);
  if (val === null) return null;
  try { return JSON.parse(val); } catch { return val; }
}

export async function kvSet(key, value, exSeconds) {
  const client = await getClient();
  if (!client) throw new Error('KV not configured');
  const str = JSON.stringify(value);
  if (exSeconds) {
    await client.set(key, str, { EX: exSeconds });
  } else {
    await client.set(key, str);
  }
}

export function kvReady() {
  return !!process.env.REDIS_URL;
}
