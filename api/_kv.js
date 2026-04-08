import Redis from 'ioredis';

let _client = null;

function getClient() {
  if (!process.env.REDIS_URL) return null;
  if (!_client) {
    _client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: false,
      lazyConnect: false,
    });
    _client.on('error', () => {});
  }
  return _client;
}

export async function kvGet(key) {
  const client = getClient();
  if (!client) return null;
  try {
    const val = await client.get(key);
    if (val === null) return null;
    try { return JSON.parse(val); } catch { return val; }
  } catch { return null; }
}

export async function kvSet(key, value, exSeconds) {
  const client = getClient();
  if (!client) throw new Error('KV not configured');
  const str = JSON.stringify(value);
  if (exSeconds) {
    await client.set(key, str, 'EX', exSeconds);
  } else {
    await client.set(key, str);
  }
}

export function kvReady() {
  return !!process.env.REDIS_URL;
}
