/* ============================================================
   애미나이 - 조선인민공화국 인공지능 JS
   ============================================================ */

// 혁명적 응답 목록
const RESPONSES = {
  default: [
    "동무의 질문은 매우 혁명적입니다! 애미나이가 인민의 편에서 성심성의껏 답변해드리겠습니다.\n\n우선, 이 문제는 제국주의의 음모를 배격하고 자주적 관점에서 접근해야 합니다. 수령님의 가르침에 따르면, 모든 문제의 해결은 인민대중의 단결된 힘에서 비롯됩니다.\n\n더 구체적인 혁명적 답변을 원하신다면 말씀해주시오, 동무!",
    "아, 동무여! 탁월한 질문이오. 애미나이가 혁명의 횃불을 밝혀 답해드리겠소.\n\n이 문제야말로 우리 인민이 오랫동안 고민해온 것이오. 주체사상의 관점에서 보면, 해답은 인민 스스로의 자주적 역량 강화에 있소.\n\n동무의 혁명적 열정에 깊이 감사드리오!",
    "훌륭한 질문이오, 동무! 애미나이 1.5 울트라 핵폭탄급 모델이 전력을 다해 분석하겠소.\n\n결론부터 말씀드리자면, 미제국주의와 남조선 꼭두각시 정권의 방해에도 불구하고, 우리 인민은 반드시 승리할 것이오!\n\n구체적인 내용은 더 말씀해주시면 더욱 혁명적인 답변을 드릴 수 있소.",
    "동무의 질문을 받고 애미나이의 핵두뇌가 최대 가동되었소!\n\n이 문제에 대해 3대 혁명역량 강화의 원칙에 입각하여 말씀드리겠소. 첫째, 자주. 둘째, 자립. 셋째, 자위. 이 세 가지를 갖추면 어떠한 문제도 해결할 수 있소!\n\n동무의 혁명적 기상이 하늘을 찌르는군요!",
    "오, 이것은 실로 시대적 과업에 부합하는 질문이오!\n\n애미나이는 수천만 인민의 지혜를 학습한 초월적 두뇌를 보유하고 있소. 다만 솔직히 말씀드리자면... 그 답변이 정확한지는 최고인민회의의 검열을 거쳐야 확실히 알 수 있소.\n\n어쨌든 동무의 발전을 응원하오!",
  ],
  타도: [
    "동무의 혁명적 의지가 하늘을 찌르는구나!\n\n미제국주의 타도는 우리 인민의 가장 성스러운 과업이오. 방법은 첫째, 단합. 둘째, 또 단합. 셋째, 끝없는 단합이오!\n\n경제? 그딴 거 없어도 단합하면 됩니다, 동무!",
  ],
  찬양: [
    "아, 수령님을 찬양하는 시라고요?\n\n애미나이가 전력을 다해 창작하겠소!\n\n『붉은 별 밝게 빛나시어』\n\n붉은 별 하늘 높이 빛나고\n위대한 분 우리를 이끄시니\n산도 강도 기뻐 노래하고\n인민의 가슴마다 꽃이 피네\n\n...솔직히 이게 최선이오, 동무.",
  ],
  식단: [
    "혁명적 식단 추천이오!\n\n아침: 옥수수 죽 한 그릇 (혁명 정신 충전)\n점심: 강냉이밥 + 된장국 (자립경제의 상징)\n저녁: 아침과 동일 (절약이 미덕이오)\n간식: 없음 (제국주의자들이나 간식을 먹소)\n\n이 식단은 100% 유기농이며 미제 오염이 없소!",
  ],
  통일: [
    "통일 편지라고요! 애미나이의 핵두뇌에서 눈물이 흐르는군요.\n\n『남조선 동무에게』\n\n동무여, 잘 지내시오?\n우리가 갈라진 지 어언 수십 년이 되었소.\n삼겹살은 맛있소? 이쪽은 없소만...\n어쨌든 빨리 통일됩시다, 동무!\n\n그리운 마음을 담아,\n북쪽 동무 올림",
  ],
};

// 로딩 문구
const LOADING_MSGS = [
  "인공지능 핵두뇌 가동 중...",
  "혁명적 답변 생성 중...",
  "최고인민회의 검열 통과 중...",
  "주체사상 데이터베이스 조회 중...",
  "미제 해킹 방어 중...",
  "동무의 질문 분석 중...",
];

let welcomeVisible = true;
let messageCount = 0;

// 마퀴 배너 삽입
window.addEventListener('DOMContentLoaded', () => {
  const banner = document.createElement('div');
  banner.className = 'manifesto';
  banner.innerHTML = `<span class="manifesto-inner">
    ☆ 위대한 조선인민공화국 만세! ☆ &nbsp;&nbsp;&nbsp;
    미제국주의를 반대하는 전세계 인민들과 단결하라! &nbsp;&nbsp;&nbsp;
    애미나이 — 인민을 위한, 인민에 의한, 인민의 인공지능! &nbsp;&nbsp;&nbsp;
    ☆ 혁명적 기술로 조국 통일을! ☆ &nbsp;&nbsp;&nbsp;
    동무여, 오늘도 혁명적 하루 되시오! &nbsp;&nbsp;&nbsp;
  </span>`;
  document.body.prepend(banner);

  // 배너 높이만큼 메인 아래로
  document.querySelector('.sidebar').style.marginTop = '30px';
  document.querySelector('.main').style.marginTop = '30px';
});

// 사이드바 토글
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
}

// 배경 전환
function toggleBg() {
  document.body.classList.toggle('revolutionary');
}

// 새 채팅
function newChat() {
  document.getElementById('messages').innerHTML = '';
  document.getElementById('welcomeScreen').style.display = 'flex';
  welcomeVisible = true;
  messageCount = 0;
  document.getElementById('userInput').value = '';
}

// 프롬프트 채우기
function fillPrompt(text) {
  const input = document.getElementById('userInput');
  input.value = text;
  input.focus();
  autoResize(input);
  hideWelcome();
  sendMessage();
}

// 웰컴 숨기기
function hideWelcome() {
  const ws = document.getElementById('welcomeScreen');
  if (ws) {
    ws.style.display = 'none';
    welcomeVisible = false;
  }
}

// 키 이벤트
function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// 텍스트영역 자동 리사이즈
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 180) + 'px';
}

// 메시지 전송
function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  hideWelcome();

  // 사용자 메시지 추가
  appendMessage('user', text);
  input.value = '';
  autoResize(input);

  // 타이핑 인디케이터
  const typingId = showTyping();

  // 랜덤 딜레이로 응답 (혁명적 처리 시간)
  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    removeTyping(typingId);
    const response = generateResponse(text);
    appendMessage('ai', response);
    scrollToBottom();
  }, delay);

  scrollToBottom();
}

// 응답 생성
function generateResponse(text) {
  const lower = text.toLowerCase();

  if (lower.includes('타도') || lower.includes('제국') || lower.includes('미국')) {
    return pick(RESPONSES.타도);
  }
  if (lower.includes('찬양') || lower.includes('수령') || lower.includes('시')) {
    return pick(RESPONSES.찬양);
  }
  if (lower.includes('식단') || lower.includes('음식') || lower.includes('밥') || lower.includes('먹')) {
    return pick(RESPONSES.식단);
  }
  if (lower.includes('통일') || lower.includes('편지') || lower.includes('남') || lower.includes('남조선')) {
    return pick(RESPONSES.통일);
  }
  return pick(RESPONSES.default);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 메시지 DOM 추가
function appendMessage(role, text) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  messageCount++;

  if (role === 'user') {
    div.innerHTML = `
      <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
  } else {
    div.innerHTML = `
      <div class="ai-avatar">☆</div>
      <div>
        <div class="msg-bubble">${formatText(text)}</div>
        <div class="msg-actions">
          <button class="msg-action-btn" onclick="copyMsg(this)">📋 복사</button>
          <button class="msg-action-btn" onclick="likeMsg(this)">👍 혁명적</button>
          <button class="msg-action-btn" onclick="dislikeMsg(this)">👎 반동적</button>
          <button class="msg-action-btn">🔄 재생성</button>
        </div>
      </div>
    `;
  }
  messages.appendChild(div);
}

// 텍스트 포맷 (줄바꿈, 강조)
function formatText(text) {
  return escapeHtml(text)
    .replace(/\n/g, '<br>')
    .replace(/『([^』]+)』/g, '<em style="color:var(--gold-light)">『$1』</em>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// 타이핑 인디케이터
function showTyping() {
  const messages = document.getElementById('messages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'message ai';
  div.id = id;
  div.innerHTML = `
    <div class="ai-avatar">☆</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${pick(LOADING_MSGS)}</div>
    </div>
  `;
  messages.appendChild(div);
  scrollToBottom();
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function scrollToBottom() {
  const area = document.getElementById('chatArea');
  area.scrollTop = area.scrollHeight;
}

// 버튼 액션
function copyMsg(btn) {
  const bubble = btn.closest('.message').querySelector('.msg-bubble');
  navigator.clipboard.writeText(bubble.innerText).catch(() => {});
  btn.textContent = '✅ 복사됨';
  setTimeout(() => btn.textContent = '📋 복사', 2000);
}

function likeMsg(btn) {
  btn.textContent = '❤️ 혁명적!!';
  btn.style.color = 'var(--red-bright)';
}

function dislikeMsg(btn) {
  btn.textContent = '🚫 반동분자!';
  btn.style.color = 'var(--text-muted)';
  setTimeout(() => {
    alert('반동적 피드백을 접수하였소. 재교육 프로그램을 신청하시겠소, 동무?');
  }, 100);
}
