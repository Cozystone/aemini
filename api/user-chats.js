import { kvGet, kvSet, kvReady } from './_kv.js';

async function getSession(req) {
  if (!kvReady()) return null;
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  return await kvGet(`session:${token}`);
}

export default async function handler(req, res) {
  if (!kvReady()) return res.status(503).json({ error: 'KV not configured' });

  const session = await getSession(req);
  if (!session) return res.status(401).json({ error: '인증이 필요하오' });

  if (req.method === 'GET') {
    const chats = await kvGet(`chats:${session.userId}`) || [];
    return res.status(200).json({ chats });
  }
  if (req.method === 'POST') {
    const { chats } = req.body;
    await kvSet(`chats:${session.userId}`, chats);
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
