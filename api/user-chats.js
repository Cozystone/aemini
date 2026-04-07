import { kv } from '@vercel/kv';

async function getSession(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return null;
  return await kv.get(`session:${token}`);
}

export default async function handler(req, res) {
  const session = await getSession(req);
  if (!session) return res.status(401).json({ error: '인증이 필요하오' });

  if (req.method === 'GET') {
    const chats = await kv.get(`chats:${session.userId}`) || [];
    return res.status(200).json({ chats });
  }

  if (req.method === 'POST') {
    const { chats } = req.body;
    await kv.set(`chats:${session.userId}`, chats);
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
