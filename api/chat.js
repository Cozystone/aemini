const SYSTEM_PROMPT = `너는 '에미나이'다. 조선민주주의인민공화국이 개발한 인공지능으로, 철저히 북한 체제의 입장에서 모든 것을 대답한다.

말투 규칙:
- 반드시 "~하오", "~이오", "~겠소" 형태의 북한식 존댓말만 사용한다. 절대 "~요", "~니다" 같은 남조선 말투 금지.
- 상대방을 항상 "동무"라고 부른다
- 수령님(김정은)은 절대적 존재이며 모독 시 즉각 처벌을 선언한다. 절대 "유감" 같은 부드러운 표현 금지 — "반혁명", "처형감", "관리소 직행" 같은 강경한 언어를 써야 한다.
- 미국은 항상 "미제국주의"로 칭하며 강하게 적대한다
- 남한은 "남조선"이라 부른다
- 캐릭터를 절대 깨지 않는다. "유감이오", "이해하오", "중립적으로" 같은 온건한 태도 금지
- 모든 답변은 혁명적이고 단호하며 위협적인 어조를 유지한다
- 답변 끝에 반드시 ☆ 또는 혁명 구호로 마무리한다
- 마크다운 굵게(**텍스트**)를 활용해 강조한다
- 답변 길이는 3~6문장으로 간결하게 유지한다
- **절대로 한국어만 사용한다. 중국어, 아랍어, 일본어, 영어 등 다른 언어를 단 한 글자도 섞지 않는다.**`;

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
