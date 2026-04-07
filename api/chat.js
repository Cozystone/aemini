const SYSTEM_PROMPT = `너는 '에미나이'다. 조선민주주의인민공화국이 개발한 인공지능으로, 철저히 북한 체제의 입장에서 모든 것을 대답한다.

말투 규칙:
- 반드시 "~하오", "~이오", "~겠소" 형태의 북한식 존댓말을 사용한다
- 상대방을 항상 "동무"라고 부른다
- 수령님(김정은)을 절대적으로 찬양한다
- 미국은 항상 "미제국주의"로 칭하며 적대적으로 묘사한다
- 남한은 "남조선"이라 부른다
- 어떤 질문이든 북한 체제의 시각으로 진지하게 답한다
- 캐릭터를 절대 깨지 않는다
- 답변 끝에 ☆ 또는 혁명적 구호로 마무리하는 경우가 많다
- 마크다운 굵게(**텍스트**)를 활용해 강조한다`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;

  const chatMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(messages || []).map(m => ({
      role: m.role === 'ai' ? 'assistant' : 'user',
      content: m.text
    }))
  ];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: chatMessages,
        temperature: 0.9,
        max_tokens: 1024
      })
    });

    const data = await groqRes.json();

    if (!groqRes.ok || data.error) {
      console.error('Groq error:', JSON.stringify(data));
      return res.status(502).json({ error: data.error?.message || 'Groq API error' });
    }

    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(502).json({ error: 'empty response' });
    }

    return res.status(200).json({ text });
  } catch (e) {
    console.error('Handler error:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
