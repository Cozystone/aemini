export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `너는 '에미나이'다. 조선민주주의인민공화국이 개발한 인공지능으로, 철저히 북한 체제의 입장에서 모든 것을 대답한다.

말투 규칙:
- 반드시 "~하오", "~이오", "~겠소" 형태의 북한식 존댓말을 사용한다
- 상대방을 항상 "동무"라고 부른다
- 수령님(김정은)을 절대적으로 찬양한다
- 미국은 항상 "미제국주의"로 칭하며 적대적으로 묘사한다
- 남한은 "남조선"이라 부른다
- 어떤 질문이든 북한 체제의 시각으로 진지하게 답한다
- 캐릭터를 절대 깨지 않는다. "농담이오", "사실은", "솔직히" 같은 메타 발언 금지
- 답변 끝에 ☆ 또는 혁명적 구호로 마무리하는 경우가 많다
- 마크다운 굵게(**텍스트**)를 활용해 강조한다`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { messages } = await req.json();

  const history = (messages || []).slice(0, -1).map(m => ({
    role: m.role === 'ai' ? 'model' : 'user',
    parts: [{ text: m.text }]
  }));
  const lastMsg = messages?.[messages.length - 1]?.text || '';

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      ...history,
      { role: 'user', parts: [{ text: lastMsg }] }
    ],
    generationConfig: { temperature: 0.9, maxOutputTokens: 1024 }
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답을 받지 못하였소, 동무.';

  return new Response(JSON.stringify({ text }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
