import { kvGet, kvSet, kvReady } from '../_kv.js';
import { createHash, randomUUID } from 'crypto';

function hashPw(password, salt) {
  return createHash('sha256').update(password + salt).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!kvReady()) return res.status(503).json({ error: 'KV 데이터베이스가 연결되지 않았소. Vercel Storage를 설정하시오.' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '아이디와 비밀번호를 입력하시오' });

  const user = await kvGet(`user:${username}`);
  if (!user) return res.status(401).json({ error: '등록되지 않은 동무이오' });
  if (hashPw(password, user.salt) !== user.passwordHash) return res.status(401).json({ error: '비밀번호가 틀렸소' });

  const token = randomUUID();
  await kvSet(`session:${token}`, { userId: user.id, username }, 60 * 60 * 24 * 30);

  res.status(200).json({ token, username });
}
