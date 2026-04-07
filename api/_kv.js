// Vercel KV REST API 래퍼 (패키지 없이 직접 호출)
// KV_REST_API_URL/TOKEN 또는 REDIS_URL(Upstash) 모두 지원
function getConfig() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return { base: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN };
  }
  if (process.env.REDIS_URL) {
    // rediss://default:TOKEN@HOST.upstash.io:PORT
    try {
      const url = new URL(process.env.REDIS_URL);
      const base = `https://${url.hostname}`;
      const token = url.password;
      if (base && token) return { base, token };
    } catch {}
  }
  return null;
}

function headers(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

export async function kvGet(key) {
  const cfg = getConfig();
  if (!cfg) return null;
  const res = await fetch(`${cfg.base}/get/${encodeURIComponent(key)}`, { headers: headers(cfg.token) });
  const data = await res.json();
  if (!data.result) return null;
  try { return JSON.parse(data.result); } catch { return data.result; }
}

export async function kvSet(key, value, exSeconds) {
  const cfg = getConfig();
  if (!cfg) throw new Error('KV not configured');
  const cmd = exSeconds
    ? ['set', key, JSON.stringify(value), 'ex', exSeconds]
    : ['set', key, JSON.stringify(value)];
  const res = await fetch(`${cfg.base}/pipeline`, {
    method: 'POST',
    headers: headers(cfg.token),
    body: JSON.stringify([cmd])
  });
  return res.ok;
}

export function kvReady() {
  return !!getConfig();
}
