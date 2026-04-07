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
  if (username.length < 2 || username.length > 20) return res.status(400).json({ error: '아이디는 2~20자이오' });
  if (password.length < 4) return res.status(400).json({ error: '비밀번호는 4자 이상이오' });

  const existing = await kvGet(`user:${username}`);
  if (existing) return res.status(409).json({ error: '이미 등록된 동무이오' });

  const salt = randomUUID();
  const userId = randomUUID();
  await kvSet(`user:${username}`, { id: userId, username, passwordHash: hashPw(password, salt), salt, createdAt: Date.now() });

  const token = randomUUID();
  await kvSet(`session:${token}`, { userId, username }, 60 * 60 * 24 * 30);

  res.status(200).json({ token, username });
}
