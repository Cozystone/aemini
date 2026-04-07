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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;

  // 시스템 프롬프트를 첫 대화로 삽입 (system_instruction 대신)
  const contents = [
    { role: 'user',  parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: '알겠소, 동무. 에미나이로서 혁명적으로 답변드리겠소. ☆' }] },
    ...(messages || []).map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }))
  ];

  const body = {
    contents,
    generationConfig: { temperature: 0.9, maxOutputTokens: 1024 }
  };

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok || data.error) {
      console.error('Gemini error:', JSON.stringify(data));
      return res.status(502).json({ error: data.error?.message || 'Gemini API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('Empty response:', JSON.stringify(data));
      return res.status(502).json({ error: 'empty response' });
    }

    return res.status(200).json({ text });
  } catch (e) {
    console.error('Handler error:', e.message);
    return res.status(500).json({ error: e.message });
  }
}
