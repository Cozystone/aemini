import { Redis } from '@upstash/redis';

let _client = null;

function getClient() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  if (!_client) _client = Redis.fromEnv();
  return _client;
}

export async function kvGet(key) {
  const client = getClient();
  if (!client) return null;
  return await client.get(key);
}

export async function kvSet(key, value, exSeconds) {
  const client = getClient();
  if (!client) throw new Error('KV not configured');
  if (exSeconds) {
    await client.set(key, value, { ex: exSeconds });
  } else {
    await client.set(key, value);
  }
}

export function kvReady() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
