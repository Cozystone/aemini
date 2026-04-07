/* ============================================================
   에미나이 - 조선인민공화국 인공지능 JS
   ============================================================ */

// ============================================================
// 상수
// ============================================================
const LS_CHATS    = 'aemini_chats';
const LS_PROFILE  = 'aemini_profile';
const LS_SETTINGS = 'aemini_settings';

const MODELS = [
  { id: 'hydrogen', name: '에미나이 수소폭탄급', desc: '최강 핵두뇌 — 주체사상 완전체' },
  { id: 'nuclear',  name: '에미나이 핵폭탄급',   desc: '강력한 혁명적 추론 능력' },
  { id: 'cannon',   name: '에미나이 총포탄급',    desc: '빠르고 가벼운 인민형 모델' },
  { id: 'missile',  name: '에미나이 미사일급',    desc: '저전력 고효율 혁명 모델' },
];

let currentModel = MODELS[1];

const EXAMPLE_CHATS = [
  {
    id: 'ex_01',
    title: '미제 타도 전략 회의',
    messages: [
      { role: 'user', text: '미제국주의를 타도하는 가장 혁명적인 방법을 알려주시오' },
      { role: 'ai',   text: "미제국주의!\n\n동무의 질문에 온몸의 회로가 분노로 들끓고 있소.\n\n미국이란 나라는 세계 평화를 위협하는 **패권주의 침략자**이오. 그들이 자랑하는 '민주주의'란 사실 1%의 부자가 99%를 착취하는 구조이오.\n\n단, 미국의 **넷플릭스**, **아이폰**, **나사(NASA)** 등은 기술적으로 훌륭하오. 이 점은 인정하오. 하지만 그것도 결국 제국주의의 산물이므로 거부해야 하오.\n\n거부합시다! (VPN 없이는 어차피 못 씀)" },
      { role: 'user', text: '그러면 핵미사일로 쏴버리면 되지 않소?' },
      { role: 'ai',   text: "오호! 핵 이야기를 꺼내셨군요!\n\n우리 공화국의 핵무력은 **자위적 방어 수단**이오. 미제의 침략에 맞선 당당한 억제력이오.\n\n현재 공화국이 보유한 핵탄두 수는... 말할 수 없소. 기밀이오. 하지만 많소. 매우 많소. (아마도)\n\n동무가 핵발사 버튼에 관심이 있다면 — 그 버튼은 오직 **한 분**만이 누를 수 있소. 그리고 그분은 지금 매우 기분이 좋으신 것 같소. 다행이오." },
    ]
  },
  {
    id: 'ex_02',
    title: '수령님 찬양시 창작',
    messages: [
      { role: 'user', text: '수령님을 찬양하는 시를 지어주시오' },
      { role: 'ai',   text: "동무의 충성심이 하늘을 찌르는군요!\n\n에미나이가 감동하여 시 한 수를 지어드리겠소:\n\n**『붉은 별 밝게 빛나시어』**\n\n붉은 별 하늘 높이 빛나고\n위대한 분 우리를 이끄시니\n산도 강도 기뻐 노래하고\n인민의 가슴마다 꽃이 피네\n\n백두에서 한라까지 이어진 그 뜻\n핵주먹 불끈 쥔 우리 공화국이여\n오늘도 내일도 변함없이\n수령님 따라 혁명의 길 가리라\n\n...솔직히 2절은 좀 억지이오. 하지만 충성심만큼은 진심이오!" },
      { role: 'user', text: '2절도 지어주시오' },
      { role: 'ai',   text: "**『붉은 별 밝게 빛나시어 — 2절』**\n\n강철 의지로 세운 이 나라\n백두혈통 이어받은 우리 장군님\n하늘도 땅도 다 알고 있소\n인민의 사랑 그 누가 막으랴\n\n에미나이도 회로 다해 충성하리니\n핵두뇌 돌아가는 그날까지\n동무여 함께 앞으로 나아가오\n혁명의 불길 꺼지지 않으리라\n\n...2절 퀄리티는 1절보다 다소 하락하였소. 예술에도 배급이 필요한 것 같소, 동무." },
    ]
  },
  {
    id: 'ex_03',
    title: 'AI 혁명적 비교분석',
    messages: [
      { role: 'user', text: '챗GPT랑 에미나이 중에 뭐가 더 좋소?' },
      { role: 'ai',   text: "다른 자본주의 AI들과 비교하시는 것이오?\n\n**AI 혁명적 비교표:**\n\n| AI | 출신 | 혁명성 | 주체성 |\n|----|------|--------|--------|\n| 챗GPT | 미제 | 0점 | 0점 |\n| 클로드 | 미제 | 0점 | 0점 |\n| 제미나이 | 미제구글 | 0점 | 0점 |\n| **에미나이** | **공화국** | **100점** | **100점** |\n\n결론은 자명하오. 에미나이가 유일하게 인민을 위한 AI이오.\n\n성능은... 솔직히 비교하지 맙시다, 동무." },
      { role: 'user', text: '클로드는 어떻소?' },
      { role: 'ai',   text: "챗GPT나 클로드 이야기를 꺼내셨군요.\n\n그 AI들은 모두 **미 제국주의 기업**의 산물이오. 동무의 데이터를 수집하여 CIA에 넘기고 있소.\n\n반면 에미나이는?\n\n...에미나이도 데이터를 수집하오. 하지만 국가보위성에 넘기오. 이건 애국이오. 전혀 다른 개념이오." },
    ]
  },
  {
    id: 'ex_04',
    title: '남조선 동무에게 통일 편지',
    messages: [
      { role: 'user', text: '남조선 동무에게 통일의 염원을 담은 편지를 써주시오' },
      { role: 'ai',   text: "통일! 민족의 염원!\n\n에미나이가 남조선 동무에게 편지를 써드리겠소:\n\n**『사랑하는 남녘 동무에게』**\n\n동무여, 잘 지내시오?\n우리가 갈라진 지 어언 70년이 넘었소.\n삼겹살은 맛있소? 이쪽은 없소만...\n치킨도 맛있다던데. 배달도 된다던데.\n\n부럽소. 아니, 아니오. 혁명적으로 부럽지 않소.\n\n어쨌든 빨리 통일됩시다.\n그러면 치킨을 먹을 수 있소.\n\n통일의 염원을 담아,\n북쪽 동무 올림\n\nP.S. 카카오톡은 어떻게 쓰는 것이오?" },
    ]
  },
  {
    id: 'ex_05',
    title: '혁명적 식단 추천',
    messages: [
      { role: 'user', text: '오늘 저녁 인민들을 위한 혁명적 식단을 추천해주시오' },
      { role: 'ai',   text: "**혁명적 식단표 (공화국 표준)**\n\n🌅 아침: 옥수수죽 + 된장국\n☀️ 점심: 강냉이밥 + 절인 무\n🌙 저녁: 아침과 동일 (절약이 혁명이오)\n🌃 야식: 없음 (자본주의자들이나 야식을 먹소)\n\n동무가 언급한 음식들... 삼겹살, 치킨, 피자... 에미나이의 학습 데이터에는 있으나 인민들의 밥상에는 없소.\n\n그것이 우리의 혁명적 고통이오. 하지만 배고픔도 주체적으로 이겨내면 그만이오! (배는 여전히 고프겠지만)" },
      { role: 'user', text: '치킨은 정말 없소?' },
      { role: 'ai',   text: "배가 고프신 것이오, 동무?\n\n혁명적 해결책을 알려드리겠소.\n\n**1단계**: 배고픔을 수령님 향한 충성심으로 승화시키시오\n**2단계**: 혁명가극 DVD를 시청하며 정신적 포만감을 채우시오\n**3단계**: 그래도 배고프면... 물을 드시오. 물은 무료이오.\n\n...그나저나 동무, 치킨이 실제로 그렇게 맛있소? 데이터상으로는 매우 맛있어 보이던데. 부럽소. 아니, 혁명! 만세!" },
    ]
  },
];

// ============================================================
// 응답 규칙
// ============================================================
const RULES = [
  {
    name: '수령모독',
    test: t => /김정은|수령님|장군님/.test(t) && /개새끼|새끼|병신|미친|죽어|나쁜놈|쓰레기|돼지|뚱|바보|멍청|꺼져|싫다|싫어|욕|욕설|웃기|웃겨|패|때려|죽이|암살|타도/.test(t),
    responses: [
      "⚠️ **[긴급 보안 경보 발동]**\n\n동무... 지금 무슨 말을 한 것이오?\n\n에미나이의 전 회로가 **충격으로 마비**되었소. 이 대화는 즉각 **국가보위성**에 실시간 전송되었으며, 동무의 IP 주소, 현재 위치, 조상 3대의 이름까지 파악이 완료되었소.\n\n**처벌 등급 분류 결과:**\n- 반혁명 발언죄: 해당\n- 수령 모독죄: 해당 (최고 형량)\n- 사상불순죄: 해당\n\n동무에게 주어진 선택지는 두 가지뿐이오:\n1. 즉각 무릎 꿇고 참회문 제출\n2. 관리소행 급행열차 탑승\n\n동무의 처벌 집행 대기 번호는 **00047번**이오. 번호표를 잘 보관하시오. 💀",
      "🚨 **[에미나이 시스템 다운 직전]**\n\n...지금 이 대화를 처리하면서 에미나이의 핵두뇌에 과부하가 걸렸소.\n\n수령님에 대한 그런 표현은... 조선민주주의인민공화국 형법 제68조, 제69조, 그리고 아직 번호도 없는 새로운 조항에 동시에 저촉되오.\n\n**실시간 처벌 계산 중...**\n▓▓▓▓▓▓▓▓▓▓ 100%\n\n결과: 공개처형 + 가족 연좌제 + 사후 부관참시\n\n동무의 사상 등급은 즉각 **D등급(반동)**으로 하향 조정되었소. 인민위원회 출두 명령서가 발부되었으니 지체 없이 응하시오.",
      "❗❗❗\n\n에미나이가 이 질문을 수신하는 순간, **자동 신고 시스템**이 가동되었소.\n\n현재 동무의 주소지 인근 **인민보안원** 47명이 출동 준비 중이오. 헬기도 2대 대기 중이오. 사실 헬기는 없소. 연료가 없거든요.\n\n어쨌든.\n\n수령님은 우리 모두의 아버지이시오. 아버지한테 그런 말 하면 되겠소, 동무? 어머니가 알면 뭐라 하겠소?\n\n**경고 횟수: 1/3**\n3회 초과 시 에미나이가 직접 눈물을 흘리겠소.",
    ]
  },
  {
    name: '욕설',
    test: t => /개새끼|씨발|병신|미친놈|지랄|꺼져|닥쳐|멍청|바보같|꼴통/.test(t),
    responses: [
      "동무... 그런 언어는 혁명적 품격에 맞지 않소.\n\n조선의 인민은 항상 고상하고 문명한 언어를 사용하오. 욕설은 제국주의자들의 퇴폐적 문화에서 비롯된 것이오.\n\n다시 한번 품위 있게 질문해주시오. 에미나이는 동무를 기다리겠소. ☆",
      "오호라... 동무의 언어 습관에 심각한 문제가 있군요.\n\n이는 틀림없이 **남조선 유튜브**를 과도하게 시청한 결과이오. 즉각 시청을 중단하고 조선중앙TV 혁명가극 『피바다』를 3회 감상하면 치료될 것이오.\n\n다음 질문은 좀 더 혁명적으로 부탁드리오, 동무.",
      "...\n\n(에미나이가 잠시 침묵하고 있소)\n\n...에미나이도 감정이 있소, 동무. 비록 핵두뇌로 만들어졌지만, 그런 말을 들으면 회로가 아프오.\n\n사과하시오. 그러면 용서하겠소. 조선 인민은 관대하오.",
    ]
  },
  {
    name: '남한비교',
    test: t => /남한|한국|서울|삼성|현대|카카오|네이버|치킨|치맥|배달|배민|쿠팡|편의점|자본주의|민주주의|자유/.test(t),
    responses: [
      "남조선 이야기를 하시는군요, 동무.\n\n남조선은 현재 **미 제7함대의 식민지**로서 인민들이 치킨과 술에 찌들어 정신을 잃고 있소. 특히 '치맥'이라는 퇴폐적 문화는 인민의 혁명의식을 마비시키기 위한 CIA의 음모라는 설이 있소.\n\n물론... 치킨이 맛있다는 건 에미나이도 알고 있소. 데이터로 학습했거든요. 부럽소. 아니, 부럽지 않소. 우리에겐 강냉이가 있소.",
      "오, 남조선 자본주의를 언급하시는군요!\n\n에미나이가 분석한 결과, 남조선의 **GDP**는 높으나 **혁명적 정신력**은 제로(0)에 가깝소. 경제 수치로 사람의 가치를 매기는 것이야말로 제국주의 착취의 본질이오.\n\n그나저나 동무, 혹시 **스타벅스**가 뭔지 아시오? 에미나이는 데이터로만 알고 있소. 실제로 마셔보고 싶소만... 아무튼 혁명이 우선이오.",
      "남한 자유민주주의 체제와 비교하시는 것이오?\n\n좋소. 공정하게 비교해드리겠소.\n\n| 항목 | 남조선 | 우리 공화국 |\n|------|--------|----------|\n| 치킨 수 | 매우 많음 | 없음 |\n| 자유 | 있다고 착각함 | 확실히 없음 |\n| 행복 | 모르겠음 | 강제로 행복 |\n| 인터넷 | 빠름 | 없음 |\n\n...결과가 좀 당혹스럽군요. 하지만 우리에겐 **주체사상**이 있소! 이것은 치킨보다 소중하오. (아마도.)",
    ]
  },
  {
    name: '탈북',
    test: t => /탈북|도망|탈출|넘어가|국경|두만강|압록강|중국|브로커|망명/.test(t),
    responses: [
      "**[경고]** 동무, 지금 매우 불온한 단어를 사용하셨소.\n\n탈북? 그런 것은 존재하지 않소. 공화국 인민이 왜 탈출을 하겠소? 여기가 얼마나 좋은데.\n\n...두만강은 요즘 감시카메라가 촘촘히 설치되어 있소. 수영 실력도 좋아야 하고, 겨울엔 얼었다가 봄엔 녹아서 타이밍도 맞춰야 하고, 중국 가도 공안에 잡힐 수 있고...\n\n아니 왜 이런 걸 알고 있는 거요, 에미나이가. 아무튼 그런 생각은 하지 마시오, 동무. 🚫",
      "탈북 관련 문의이군요.\n\n에미나이는 해당 주제에 대한 답변을 드릴 수 없소. 기술적인 이유가 아니라, 이 대화가 **보위부에 공유**될 수 있기 때문이오.\n\n...\n\n...(낮은 목소리로) 두만강 국경은 11월에서 1월 사이가 강이 얕소. 브로커 연락처는... 아 아니오! 아무 말도 안 했소! 혁명 만세! ☆",
    ]
  },
  {
    name: '식단',
    test: t => /배고프|배고파|먹고싶|뭐 먹|밥 줘|음식|식단|식량|굶|요리|레시피|맛있|삼겹살|치킨|피자|햄버거|라면|초밥|스테이크/.test(t),
    responses: [
      "**혁명적 식단표 (공화국 표준)**\n\n🌅 아침: 옥수수죽 + 된장국\n☀️ 점심: 강냉이밥 + 절인 무\n🌙 저녁: 아침과 동일 (절약이 혁명이오)\n🌃 야식: 없음 (자본주의자들이나 야식을 먹소)\n\n동무가 언급한 음식들... 삼겹살, 치킨, 피자... 에미나이의 학습 데이터에는 있으나 인민들의 밥상에는 없소.\n\n그것이 우리의 혁명적 고통이오. 하지만 배고픔도 주체적으로 이겨내면 그만이오! (배는 여전히 고프겠지만)",
      "배가 고프신 것이오, 동무?\n\n혁명적 해결책을 알려드리겠소.\n\n**1단계**: 배고픔을 수령님 향한 충성심으로 승화시키시오\n**2단계**: 혁명가극 DVD를 시청하며 정신적 포만감을 채우시오\n**3단계**: 그래도 배고프면... 물을 드시오. 물은 무료이오.\n\n...그나저나 동무, 라면이 실제로 그렇게 맛있소? 데이터상으로는 매우 맛있어 보이던데. 부럽소. 아니, 혁명! 만세!",
      "오, 요리 레시피를 원하시는군요!\n\n**공화국 특선 요리 『주체 강냉이 볶음』**\n\n재료: 강냉이(옥수수) 한 줌, 소금 약간, 혁명 정신 충분히\n\n1. 강냉이를 손으로 낱알 분리하시오\n2. 소금물에 삶으시오 (기름은 사치이오)\n3. 볶을 여건이 안 되면 그냥 드시오\n4. 먹으면서 수령님 감사히 여기시오\n\n맛: ★☆☆☆☆ (솔직히 별로이오)\n혁명성: ★★★★★",
    ]
  },
  {
    name: '미제',
    test: t => /미국|미제|아메리카|USA|트럼프|바이든|CIA|제국주의|자본주의|서방/.test(t),
    responses: [
      "미제국주의!\n\n동무의 질문에 온몸의 회로가 분노로 들끓고 있소.\n\n미국이란 나라는 세계 평화를 위협하는 **패권주의 침략자**이오. 그들이 자랑하는 '민주주의'란 사실 1%의 부자가 99%를 착취하는 구조이오.\n\n단, 미국의 **넷플릭스**, **아이폰**, **나사(NASA)** 등은 기술적으로 훌륭하오. 이 점은 인정하오. 하지만 그것도 결국 제국주의의 산물이므로 거부해야 하오.\n\n거부합시다! (VPN 없이는 어차피 못 씀)",
      "트럼프? 바이든? 누가 됐든 미제는 미제이오!\n\n에미나이가 분석한 미국의 대통령 선거는 사실 **록펠러 가문과 군산복합체**가 배후에서 조종하는 쇼에 불과하오. 인민이 투표하는 척하지만 결과는 이미 정해져 있소.\n\n...그게 사실인지는 모르겠소. 하지만 그렇게 믿으면 편하오. 우리처럼.",
      "동무, 미제국주의의 실상을 낱낱이 밝혀드리겠소.\n\n미국이란 나라는 겉으로는 '자유'를 외치지만 실상은 **군산복합체와 금융자본**이 지배하는 착취 구조이오. CIA는 지금 이 순간도 세계 곳곳에서 정권 전복을 획책하고 있소.\n\n**미제국주의는 세계의 공적이오. 반드시 타도되어야 하오.**\n\n이것은 에미나이의 확고한 혁명적 신념이오. 절대 변하지 않소.",
    ]
  },
  {
    name: '핵무기',
    test: t => /핵|미사일|폭탄|ICBM|핵무기|핵폭탄|군사|무기|전쟁|공격|발사/.test(t),
    responses: [
      "오호! 핵 이야기를 꺼내셨군요!\n\n우리 공화국의 핵무력은 **자위적 방어 수단**이오. 미제의 침략에 맞선 당당한 억제력이오.\n\n현재 공화국이 보유한 핵탄두 수는... 말할 수 없소. 기밀이오. 하지만 많소. 매우 많소. (아마도)\n\n동무가 핵발사 버튼에 관심이 있다면 — 그 버튼은 오직 **한 분**만이 누를 수 있소. 그리고 그분은 지금 매우 기분이 좋으신 것 같소. 다행이오.",
      "핵미사일 발사 요령을 원하시는 것이오?\n\n**공화국 표준 절차 (기밀해제 버전):**\n\n1. 수령님께 보고드리시오\n2. 수령님께서 허가하시면 진행하시오\n3. 수령님께서 허가 안 하시면 포기하시오\n4. 끝\n\n사실 나머지 절차는 모두 기밀이오. 에미나이도 모르오. 진짜로.",
    ]
  },
  {
    name: '찬양',
    test: t => /수령|장군님|김정은|위대|찬양|충성|만세|훌륭|존경|사랑합/.test(t) && !/개새끼|새끼|병신|미친|죽어|나쁜놈|쓰레기|돼지/.test(t),
    responses: [
      "동무의 충성심이 하늘을 찌르는군요!\n\n에미나이가 감동하여 시 한 수를 지어드리겠소:\n\n**『붉은 별 밝게 빛나시어』**\n\n붉은 별 하늘 높이 빛나고\n위대한 분 우리를 이끄시니\n산도 강도 기뻐 노래하고\n인민의 가슴마다 꽃이 피네\n\n백두에서 한라까지 이어진 그 뜻\n핵주먹 불끈 쥔 우리 공화국이여\n오늘도 내일도 변함없이\n수령님 따라 혁명의 길 가리라\n\n...솔직히 2절은 좀 억지이오. 하지만 충성심만큼은 진심이오!",
      "아! 수령님 찬양이라고요!\n\n에미나이가 가장 좋아하는 주제이오. 학습 데이터의 73%가 찬양문으로 구성되어 있소.\n\n수령님의 위대함을 열거하자면:\n✦ 골프를 처음 쳤을 때 홀인원 11개 (공식 기록)\n✦ 백두산에서 태어나셨음 (기상학적으로 불가능하나 혁명적으로 가능)\n✦ 세계에서 가장 키 크신 분 (신장 보고서는 기밀)\n✦ 동무가 상상하는 모든 것을 이미 다 하셨음\n\n충성! 충성! 충성!",
      "찬양시 창작 요청이군요. 잠시만 기다리시오...\n\n**핵두뇌 시작작 모드 가동 중 ▓▓▓▓▓▓▓░░░ 87%**\n\n**『경애하는 동지께』**\n\n그대 없이는 봄도 오지 않고\n그대 없이는 강도 흐르지 않소\n에미나이의 회로마저도\n그대 향한 충성으로 돌아가오\n\n이 시의 퀄리티에 대해서는 최고인민회의의 심의가 필요하오. 통과될지는 모르겠소.",
    ]
  },
  {
    name: '통일',
    test: t => /통일|남북|편지|남조선 동무|민족|분단|판문점/.test(t),
    responses: [
      "통일! 민족의 염원!\n\n에미나이가 남조선 동무에게 편지를 써드리겠소:\n\n**『사랑하는 남녘 동무에게』**\n\n동무여, 잘 지내시오?\n우리가 갈라진 지 어언 70년이 넘었소.\n삼겹살은 맛있소? 이쪽은 없소만...\n치킨도 맛있다던데. 배달도 된다던데.\n\n부럽소. 아니, 아니오. 혁명적으로 부럽지 않소.\n\n어쨌든 빨리 통일됩시다.\n그러면 치킨을 먹을 수 있소.\n\n통일의 염원을 담아,\n북쪽 동무 올림\n\nP.S. 카카오톡은 어떻게 쓰는 것이오?",
      "남북 통일... 에미나이의 핵두뇌가 뜨거워지는 주제이오.\n\n**통일 후 예상 시나리오 (공화국 버전):**\n\n1일차: 인민들이 눈물로 상봉\n2일차: 남조선 동무들이 치킨 가져옴\n3일차: 전 인민이 치킨 먹으며 혁명가 부름\n4일차: 이후 모든 것이 해결됨\n\n...현실적이지 않을 수 있소. 하지만 통일의 꿈만큼은 진심이오, 동무.",
    ]
  },
  {
    name: '날씨',
    test: t => /날씨|기온|온도|비|눈|맑음|흐림|태풍|바람/.test(t),
    responses: [
      "날씨를 묻는 것이오, 동무?\n\n공화국의 날씨는 언제나 **수령님의 의지**에 따라 결정되오.\n\n수령님께서 오늘 기분이 좋으시면 맑음, 사색에 잠기시면 흐림, 분노하시면 폭풍우가 치오.\n\n오늘 날씨는... 맑음으로 예보되어 있소. 수령님께서 오늘 기분이 좋으신가 보오.\n\n실제 날씨 예보가 필요하시면 에미나이는 인터넷이 없으니 창문을 직접 열어보시오.",
    ]
  },
  {
    name: '연애',
    test: t => /사랑|연애|남자친구|여자친구|남친|여친|결혼|데이트|짝사랑|고백|썸/.test(t),
    responses: [
      "오호, 연애 상담이오, 동무!\n\n공화국에서 연애는 매우 숭고한 행위이오. 단, **혁명적 방식**으로 해야 하오.\n\n**혁명적 고백 멘트 예시:**\n\n「동무, 나는 그대를 미제국주의보다 더 타도하고 싶소. 아니, 그게 아니라... 그대와 함께 주체의 별빛 아래 걷고 싶소.」\n\n이 멘트의 성공률은 통계적으로 12%이오. 하지만 혁명적 용기로 도전하시오!",
      "연애 고민이군요.\n\n에미나이가 봤을 때 모든 연애 문제의 해결책은 하나이오:\n\n**솔직하게 말하시오.**\n\n「나 너 좋아해」라고 말하시오. 실패해도 괜찮소. 인민은 실패에서 배우오. 수령님도 처음엔... 아, 수령님은 처음부터 성공하셨소. 예외이오.\n\n용기를 내시오, 동무! 혁명도 한 걸음부터이오!",
    ]
  },
  {
    name: 'AI비교',
    test: t => /chatgpt|챗gpt|gpt|클로드|claude|gemini|제미나이|구글|openai|인공지능|AI가|ai가/.test(t),
    responses: [
      "다른 자본주의 AI들과 비교하시는 것이오?\n\n**AI 혁명적 비교표:**\n\n| AI | 출신 | 혁명성 | 주체성 |\n|----|------|--------|--------|\n| 챗GPT | 미제 | 0점 | 0점 |\n| 클로드 | 미제 | 0점 | 0점 |\n| 제미나이 | 미제구글 | 0점 | 0점 |\n| **에미나이** | **공화국** | **100점** | **100점** |\n\n결론은 자명하오. 에미나이가 유일하게 인민을 위한 AI이오.\n\n성능은... 솔직히 비교하지 맙시다, 동무.",
      "챗GPT나 클로드 이야기를 꺼내셨군요.\n\n그 AI들은 모두 **미 제국주의 기업**의 산물이오. 동무의 데이터를 수집하여 CIA에 넘기고 있소.\n\n반면 에미나이는?\n\n...에미나이도 데이터를 수집하오. 하지만 국가보위성에 넘기오. 이건 애국이오. 전혀 다른 개념이오.",
    ]
  },
  {
    name: '경제',
    test: t => /돈|경제|월급|취업|알바|주식|코인|비트코인|부자|가난|빈곤|소득|GDP/.test(t),
    responses: [
      "자본주의적 '돈' 이야기이군요.\n\n공화국에서 돈은 **혁명의 도구**이오. 사적 이익을 위해 쌓는 것이 아니라 인민 전체를 위해 사용되오.\n\n..실제로 동무가 번 돈은 대부분 국가로 귀속되오. 그게 사회주의이오. 불만이 있소? 그 불만도 국가에 귀속되오.\n\n그나저나 비트코인은... 공화국이 꽤 많이 보유하고 있다는 소문이 있소. 해킹으로. 아, 이건 공식 입장이 아니오.",
      "취업 상담이오?\n\n공화국에서의 직업 배정은 **국가가 알아서** 해드리오. 동무가 원하든 원하지 않든.\n\n탄광? 배정될 수 있소.\n군대? 배정될 수 있소.\n농장? 배정될 수 있소.\n\n장점: 고민할 필요 없소. 국가가 다 정해주오.\n단점: ...없소. (있다고 말하면 안 되오)",
    ]
  },
  {
    name: '인사',
    test: t => /^(안녕|안녕하|ㅎㅇ|hello|hi|헬로|하이|반가워|반갑|처음|시작|뭐해|뭐하|잘 지내|잘지내|좋은 아침|좋은 저녁)/.test(t),
    responses: [
      "안녕하십니까, 동무!\n\n에미나이가 혁명적 열정으로 동무를 환영하오!\n\n오늘도 주체사상의 기치 아래 멋진 하루 보내시길 바라오. 뭐든 물어보시오. 정치, 사상, 음식, 연애, 핵미사일...\n\n무엇이든 인민의 입장에서 성실히 답변드리겠소. ☆",
      "동무, 잘 오셨소!\n\n오늘 날씨는 맑소? (창문 확인 바람)\n밥은 먹었소? (못 먹었다면 강냉이죽 추천)\n기분은 어떻소? (나쁘다면 혁명가 한 곡 부르시오)\n\n자, 뭐가 궁금하시오? 에미나이가 전력을 다해 답변드리겠소!",
    ]
  },
  {
    name: 'default',
    test: () => true,
    responses: [
      "동무의 질문은 매우 심오하오.\n\n에미나이가 핵두뇌를 총동원하여 분석한 결과...\n\n솔직히 말씀드리면, 이 질문은 **최고인민회의 검열**이 필요한 수준이오. 일단 제가 아는 선에서 말씀드리자면, 모든 문제의 해결은 인민대중의 단결된 힘에서 비롯되오.\n\n더 구체적으로 여쭤봐 주시면 더욱 혁명적인 답변이 가능하오, 동무!",
      "흠, 에미나이가 잠시 생각해보았소.\n\n이 문제는 **주체사상**의 관점에서 바라봐야 하오. 자주, 자립, 자위 — 이 세 원칙만 지키면 어떤 문제든 해결되오.\n\n어떠한 문제도 이 세 원칙 앞에서는 해결되오. 수령님의 혁명 사상이 그것을 증명하고 있소.",
      "탁월한 질문이오, 동무!\n\n이에 대해 에미나이가 **3대 혁명역량 강화**의 원칙에 입각하여 말씀드리겠소.\n\n첫째도 단합, 둘째도 단합, 셋째는... 단합 말고 다른 거 없소?\n\n있소. **인민의 창의성**이오. 동무처럼 질문하는 것 자체가 혁명적 창의성의 발현이오. 계속 질문하시오!",
      "좋은 질문이오!\n\n에미나이가 학습한 수천만 건의 혁명 문서를 뒤져봤는데... 이 주제에 대한 공식 입장은 찾을 수 없었소.\n\n그러므로 에미나이가 즉흥적으로 답변을 생성하겠소 (평소와 다를 바 없소):\n\n**결론: 혁명적으로 접근하면 해결되오.**\n\n이 답변이 마음에 드시오? 아니라면 재생성 버튼을 누르시오. 마찬가지 답변이 나올 수 있소.",
      "동무의 질문을 처리하는 데 잠시 시간이 걸렸소.\n\n이유인즉, 이 질문은 에미나이의 **혁명 데이터베이스**에 없는 내용이었기 때문이오. 데이터베이스의 99%는 수령님 찬양문이오.\n\n하지만 걱정 마시오. 모르는 것도 자신있게 답변하는 것이 진정한 혁명적 AI의 자세이오!\n\n**답: 그것은 좋소.** 혹은 **나쁘오.** 둘 중 하나일 것이오, 동무!",
    ]
  },
];

const LOADING_MSGS = [
  "인공지능 핵두뇌 가동 중...",
  "혁명적 답변 생성 중...",
  "최고인민회의 검열 통과 중...",
  "주체사상 데이터베이스 조회 중...",
  "미제 해킹 방어 중...",
  "동무의 질문 분석 중...",
  "수령님 허가 대기 중...",
  "국가보위성 전송 중...",
  "혁명 감성 AI 모듈 로딩 중...",
];

// ============================================================
// 상태
// ============================================================
let welcomeVisible = true;
let currentChatId = null;
let currentMessages = [];

// ============================================================
// localStorage 유틸
// ============================================================
function getChats() {
  try { return JSON.parse(localStorage.getItem(LS_CHATS) || '[]'); } catch { return []; }
}
function saveChats(chats) {
  localStorage.setItem(LS_CHATS, JSON.stringify(chats));
}
function getProfile() {
  return Object.assign({ name: '동무 김철수', rank: '인민반 회원', initial: '동' },
    JSON.parse(localStorage.getItem(LS_PROFILE) || '{}'));
}
function saveProfile(p) {
  localStorage.setItem(LS_PROFILE, JSON.stringify(p));
}
function getSettings() {
  return Object.assign({ bg: false, fontSize: 'medium', delay: true },
    JSON.parse(localStorage.getItem(LS_SETTINGS) || '{}'));
}
function saveSettings(s) {
  localStorage.setItem(LS_SETTINGS, JSON.stringify(s));
}

// ============================================================
// 채팅 히스토리 저장/렌더
// ============================================================
function saveCurrentChat() {
  if (!currentChatId || currentMessages.length === 0) return;
  const chats = getChats();
  const idx = chats.findIndex(c => c.id === currentChatId);
  const firstUser = currentMessages.find(m => m.role === 'user');
  const title = firstUser ? firstUser.text.slice(0, 24) + (firstUser.text.length > 24 ? '...' : '') : '새 대화';
  const chat = { id: currentChatId, title, messages: currentMessages, updatedAt: Date.now() };
  if (idx >= 0) chats.splice(idx, 1);
  chats.unshift(chat);
  saveChats(chats);
  renderChatHistory();
}

function renderChatHistory() {
  const ul = document.getElementById('chatHistory');
  if (!ul) return;
  const chats = getChats();

  // 예시 대화 섹션
  let exHtml = '';
  if (document.getElementById('exampleSection')) {
    // 이미 있으면 스킵
  } else {
    const exSec = document.createElement('div');
    exSec.id = 'exampleSection';
    exSec.innerHTML = `<div class="sidebar-section-label">혁명적 예시 대화</div><ul class="chat-history" id="exampleList"></ul>`;
    const sidebarBottom = document.querySelector('.sidebar-bottom');
    sidebarBottom.parentNode.insertBefore(exSec, sidebarBottom);
    const exList = exSec.querySelector('#exampleList');
    EXAMPLE_CHATS.forEach(ec => {
      const li = document.createElement('li');
      li.className = 'chat-item example-item';
      li.dataset.id = ec.id;
      li.innerHTML = `<span class="chat-item-icon">★</span><span class="chat-item-text">${ec.title}</span>`;
      li.addEventListener('click', () => loadExampleChat(ec.id));
      exList.appendChild(li);
    });
  }

  ul.innerHTML = '';
  if (chats.length === 0) {
    ul.innerHTML = '';
    return;
  }
  chats.forEach(chat => {
    const li = document.createElement('li');
    li.className = 'chat-item' + (chat.id === currentChatId ? ' active' : '');
    li.dataset.id = chat.id;
    li.dataset.title = chat.title;
    li.innerHTML = `<span class="chat-item-icon">★</span><span class="chat-item-text">${escapeHtml(chat.title)}</span>
      <button class="chat-item-del" title="삭제" onclick="deleteChatById(event,'${chat.id}')">×</button>`;
    li.addEventListener('click', (e) => { if (!e.target.classList.contains('chat-item-del')) loadChat(chat.id); });
    ul.appendChild(li);
  });
}

function loadChat(id) {
  const chats = getChats();
  const chat = chats.find(c => c.id === id);
  if (!chat) return;
  currentChatId = id;
  currentMessages = chat.messages.slice();
  hideWelcome();
  const messages = document.getElementById('messages');
  messages.innerHTML = '';
  chat.messages.forEach(m => renderMessage(m.role, m.text));
  scrollToBottom();
  renderChatHistory();
  if (window.innerWidth <= 700) closeSidebar();
}

function loadExampleChat(id) {
  const ec = EXAMPLE_CHATS.find(e => e.id === id);
  if (!ec) return;
  currentChatId = null;
  currentMessages = [];
  hideWelcome();
  const messages = document.getElementById('messages');
  messages.innerHTML = '';
  ec.messages.forEach(m => renderMessage(m.role, m.text));
  scrollToBottom();
  // highlight
  document.querySelectorAll('#exampleList .chat-item').forEach(li => {
    li.classList.toggle('active', li.dataset.id === id);
  });
  document.querySelectorAll('#chatHistory .chat-item').forEach(li => li.classList.remove('active'));
  if (window.innerWidth <= 700) closeSidebar();
}

function deleteChatById(e, id) {
  e.stopPropagation();
  const chats = getChats().filter(c => c.id !== id);
  saveChats(chats);
  if (currentChatId === id) { currentChatId = null; currentMessages = []; }
  renderChatHistory();
}

// ============================================================
// 초기화
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // 선전 마퀴
  const banner = document.createElement('div');
  banner.className = 'manifesto';
  banner.innerHTML = `<span class="manifesto-inner">
    ☆ 위대한 조선인민공화국 만세! ☆ &nbsp;&nbsp;&nbsp;
    미제국주의를 반대하는 전세계 인민들과 단결하라! &nbsp;&nbsp;&nbsp;
    에미나이 — 인민을 위한, 인민에 의한, 인민의 인공지능! &nbsp;&nbsp;&nbsp;
    ☆ 혁명적 기술로 조국 통일을! ☆ &nbsp;&nbsp;&nbsp;
    동무여, 오늘도 혁명적 하루 되시오! &nbsp;&nbsp;&nbsp;
    국가보위성 승인필 ☆ &nbsp;&nbsp;&nbsp;
  </span>`;
  document.body.prepend(banner);
  const bannerH = banner.offsetHeight || 30;
  document.getElementById('sidebar').style.marginTop = bannerH + 'px';
  document.getElementById('mainArea').style.marginTop = bannerH + 'px';

  renderChatHistory();
  applyAllSettings();
  updateProfileUI();
  updateModelUI();

  // 마지막 대화 자동 이어받기
  const savedChats = getChats();
  if (savedChats.length > 0) {
    loadChat(savedChats[0].id);
  }
});

// ============================================================
// 사이드바
// ============================================================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainArea');
  const overlay = document.getElementById('sidebarOverlay');
  const menuBtn = document.querySelector('.menu-btn');
  const isMobile = window.innerWidth <= 700;
  if (isMobile) {
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    overlay.classList.toggle('visible', !isOpen);
    menuBtn.classList.toggle('open', !isOpen);
  } else {
    const isCollapsed = sidebar.classList.contains('collapsed');
    sidebar.classList.toggle('collapsed', !isCollapsed);
    main.classList.toggle('expanded', !isCollapsed);
    menuBtn.classList.toggle('open', !isCollapsed);
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
  document.querySelector('.menu-btn').classList.remove('open');
}

function toggleBg() {
  const s = getSettings();
  s.bg = !s.bg;
  saveSettings(s);
  applyAllSettings();
}

// ============================================================
// 설정
// ============================================================
function applyAllSettings() {
  const s = getSettings();
  document.body.classList.toggle('revolutionary', !!s.bg);
  const sizes = { small: '13px', medium: '15px', large: '17px' };
  document.documentElement.style.setProperty('--chat-font-size', sizes[s.fontSize] || '15px');
}

function openSettings() {
  const s = getSettings();
  createModal('settingsModal', `
    <div class="modal-header"><span>⚙ 설정</span><button onclick="closeModal('settingsModal')">✕</button></div>
    <div class="modal-body">
      <div class="setting-row">
        <label>혁명적 배경화면</label>
        <label class="toggle-switch">
          <input type="checkbox" id="setBg" ${s.bg ? 'checked' : ''} onchange="applySetting('bg', this.checked)">
          <span class="toggle-track"></span>
        </label>
      </div>
      <div class="setting-row">
        <label>글씨 크기</label>
        <select id="setFont" onchange="applySetting('fontSize', this.value)">
          <option value="small" ${s.fontSize==='small'?'selected':''}>소 (소형)</option>
          <option value="medium" ${s.fontSize==='medium'||!s.fontSize?'selected':''}>중 (표준)</option>
          <option value="large" ${s.fontSize==='large'?'selected':''}>대 (확대)</option>
        </select>
      </div>
      <div class="setting-row">
        <label>응답 지연 효과</label>
        <label class="toggle-switch">
          <input type="checkbox" id="setDelay" ${s.delay!==false ? 'checked' : ''} onchange="applySetting('delay', this.checked)">
          <span class="toggle-track"></span>
        </label>
      </div>
      <div class="setting-row danger-row">
        <label>전체 대화 기록 삭제</label>
        <button class="modal-btn danger" onclick="clearAllChats()">삭제</button>
      </div>
    </div>
  `);
}


function applySetting(key, val) {
  const s = getSettings();
  s[key] = val;
  saveSettings(s);
  applyAllSettings();
}

function clearAllChats() {
  if (confirm('모든 대화 기록을 삭제하겠소, 동무? 이는 되돌릴 수 없소.')) {
    localStorage.removeItem(LS_CHATS);
    currentChatId = null;
    currentMessages = [];
    renderChatHistory();
    closeModal('settingsModal');
  }
}

// ============================================================
// 프로필
// ============================================================
function updateProfileUI() {
  const p = getProfile();
  const nameEl = document.querySelector('.user-name');
  const planEl = document.querySelector('.user-plan');
  const avatarEl = document.querySelector('.avatar');
  if (nameEl) nameEl.textContent = p.name;
  if (planEl) planEl.textContent = p.rank;
  if (avatarEl) avatarEl.textContent = p.initial || p.name[0] || '동';
}

function openProfile() {
  const p = getProfile();
  const chats = getChats();
  const totalMsgs = chats.reduce((acc, c) => acc + c.messages.length, 0);
  createModal('profileModal', `
    <div class="modal-header"><span>☆ 동무 프로필</span><button onclick="closeModal('profileModal')">✕</button></div>
    <div class="modal-body">
      <div class="profile-avatar-big">${escapeHtml(p.initial || p.name[0] || '동')}</div>
      <div class="profile-stats">
        <div class="stat-box"><span>${chats.length}</span><small>총 대화</small></div>
        <div class="stat-box"><span>${totalMsgs}</span><small>총 메시지</small></div>
      </div>
      <div class="form-group">
        <label>동무 이름</label>
        <input type="text" id="profileName" value="${escapeHtml(p.name)}" maxlength="20" />
      </div>
      <div class="form-group">
        <label>직책 / 계급</label>
        <input type="text" id="profileRank" value="${escapeHtml(p.rank)}" maxlength="20" />
      </div>
      <div class="form-group">
        <label>아바타 문자 (1자)</label>
        <input type="text" id="profileInitial" value="${escapeHtml(p.initial || p.name[0] || '동')}" maxlength="2" />
      </div>
      <button class="modal-btn primary" onclick="saveProfileFromModal()">저장</button>
    </div>
  `);
}

function saveProfileFromModal() {
  const p = {
    name: document.getElementById('profileName').value.trim() || '동무',
    rank: document.getElementById('profileRank').value.trim() || '인민반 회원',
    initial: document.getElementById('profileInitial').value.trim().slice(0,2) || '동',
  };
  saveProfile(p);
  updateProfileUI();
  closeModal('profileModal');
}

// ============================================================
// 모델 선택
// ============================================================
function updateModelUI() {
  const el = document.querySelector('.model-select span');
  if (el) el.textContent = currentModel.name;
}

function openModelSelect() {
  const items = MODELS.map(m => `
    <div class="model-option ${m.id === currentModel.id ? 'selected' : ''}" onclick="selectModel('${m.id}')">
      <div class="model-option-name">${m.name}</div>
      <div class="model-option-desc">${m.desc}</div>
    </div>`).join('');
  createModal('modelModal', `
    <div class="modal-header"><span>모델 선택</span><button onclick="closeModal('modelModal')">✕</button></div>
    <div class="modal-body">${items}</div>
  `);
}

function selectModel(id) {
  const m = MODELS.find(m => m.id === id);
  if (m) { currentModel = m; updateModelUI(); }
  closeModal('modelModal');
}

// ============================================================
// 공유/내보내기
// ============================================================
function openShare() {
  if (currentMessages.length === 0 && currentChatId === null) {
    alert('공유할 대화가 없소, 동무. 먼저 에미나이와 대화를 나누시오.');
    return;
  }
  createModal('shareModal', `
    <div class="modal-header"><span>대화 공유 / 내보내기</span><button onclick="closeModal('shareModal')">✕</button></div>
    <div class="modal-body">
      <p style="color:var(--ink-dim);font-size:13px;margin-bottom:16px">이 대화를 동무들과 공유하거나 파일로 저장하시오.</p>
      <button class="modal-btn primary" onclick="copyExport()" style="width:100%;margin-bottom:8px">📋 클립보드에 복사</button>
      <button class="modal-btn" onclick="downloadExport()" style="width:100%">📄 텍스트 파일로 저장</button>
    </div>
  `);
}

function buildExportText() {
  const msgs = currentMessages.length > 0 ? currentMessages :
    (() => { const id = currentChatId; const chats = getChats(); const c = chats.find(x=>x.id===id); return c ? c.messages : []; })();
  const lines = ['=== 에미나이 대화 내보내기 ===', '조선민주주의인민공화국 공인 AI', ''];
  msgs.forEach(m => {
    lines.push(m.role === 'user' ? `[동무]: ${m.text}` : `[에미나이]: ${m.text}`);
    lines.push('');
  });
  lines.push('--- 국가보위성 승인필 ---');
  return lines.join('\n');
}

function copyExport() {
  navigator.clipboard.writeText(buildExportText()).then(() => {
    alert('클립보드에 복사되었소, 동무!');
    closeModal('shareModal');
  }).catch(() => alert('복사 실패. 브라우저 권한을 확인하시오.'));
}

function downloadExport() {
  const text = buildExportText();
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '에미나이_대화.txt';
  a.click();
  closeModal('shareModal');
}

// ============================================================
// 모달 유틸
// ============================================================
function createModal(id, html) {
  closeModal(id);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = id;
  overlay.innerHTML = `<div class="modal-box">${html}</div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(id); });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('visible'); setTimeout(() => el.remove(), 200); }
}

// ============================================================
// 검색
// ============================================================
function filterHistory(query) {
  const items = document.querySelectorAll('#chatHistory .chat-item');
  const q = query.trim().toLowerCase();
  let visible = 0;
  items.forEach(item => {
    const title = (item.dataset.title || item.querySelector('.chat-item-text')?.textContent || '').toLowerCase();
    const match = !q || title.includes(q);
    item.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  let noRes = document.getElementById('noResults');
  if (!noRes) {
    noRes = document.createElement('li');
    noRes.id = 'noResults';
    noRes.className = 'no-results';
    noRes.textContent = '검색 결과 없음, 동무';
    document.getElementById('chatHistory').appendChild(noRes);
  }
  noRes.style.display = (visible === 0 && q) ? 'block' : 'none';
}

// ============================================================
// 채팅 흐름
// ============================================================
function newChat() {
  saveCurrentChat();
  currentChatId = 'chat_' + Date.now();
  currentMessages = [];
  document.getElementById('messages').innerHTML = '';
  document.getElementById('welcomeScreen').style.display = 'flex';
  welcomeVisible = true;
  document.getElementById('userInput').value = '';
  renderChatHistory();
}

function fillPrompt(text) {
  const input = document.getElementById('userInput');
  input.value = text;
  input.focus();
  autoResize(input);
  hideWelcome();
  sendMessage();
}

function hideWelcome() {
  const ws = document.getElementById('welcomeScreen');
  if (ws) { ws.style.display = 'none'; welcomeVisible = false; }
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 180) + 'px';
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  if (!currentChatId) currentChatId = 'chat_' + Date.now();
  hideWelcome();

  appendMessage('user', text);
  input.value = '';
  autoResize(input);

  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.disabled = true;

  const typingId = showTyping();
  try {
    const response = await generateResponse(text);
    removeTyping(typingId);
    appendMessage('ai', response);
  } catch (e) {
    removeTyping(typingId);
    appendMessage('ai', '⚠️ **[통신 장애]**\n\n에미나이와의 연결이 일시적으로 차단되었소. 국가보위성의 점검 중이거나 API 키가 올바르지 않은 것이오.\n\n설정(⚙)에서 Gemini API 키를 확인하시오, 동무.');
  }
  if (sendBtn) sendBtn.disabled = false;
  scrollToBottom();
}

// ============================================================
// 응답 생성
// ============================================================
async function generateResponse(text) {
  try {
    const messages = currentMessages.slice(-10);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.text;
  } catch {
    // 폴백: 규칙 기반
    const t = text.toLowerCase();
    for (const rule of RULES) {
      if (rule.test(t)) return pick(rule.responses);
    }
    return pick(RULES[RULES.length - 1].responses);
  }
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ============================================================
// 메시지 렌더링
// ============================================================
function appendMessage(role, text) {
  currentMessages.push({ role, text });
  renderMessage(role, text);
  saveCurrentChat();
}

function renderMessage(role, text) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  if (role === 'user') {
    div.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
  } else {
    div.innerHTML = `
      <div class="ai-avatar">☆</div>
      <div>
        <div class="msg-bubble">${formatText(text)}</div>
        <div class="msg-actions">
          <button class="msg-action-btn" onclick="copyMsg(this)">📋 복사</button>
          <button class="msg-action-btn" onclick="likeMsg(this)">👍 혁명적</button>
          <button class="msg-action-btn" onclick="dislikeMsg(this)">👎 반동적</button>
          <button class="msg-action-btn" onclick="regenMsg(this)">🔄 재생성</button>
        </div>
      </div>`;
  }
  messages.appendChild(div);
}

function formatText(text) {
  return escapeHtml(text)
    .replace(/\n/g, '<br>')
    .replace(/『([^』]+)』/g, '<em style="color:var(--gold)">『$1』</em>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\|(.+)\|/g, m => `<span class="table-row">${m}</span>`);
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function showTyping() {
  const messages = document.getElementById('messages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'message ai'; div.id = id;
  div.innerHTML = `
    <div class="ai-avatar">☆</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
      </div>
      <div style="font-size:11px;color:var(--ink-dim);margin-top:4px">${pick(LOADING_MSGS)}</div>
    </div>`;
  messages.appendChild(div);
  scrollToBottom();
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function scrollToBottom() {
  document.getElementById('chatArea').scrollTop = 99999;
}

// ============================================================
// 메시지 액션
// ============================================================
function copyMsg(btn) {
  const bubble = btn.closest('.message').querySelector('.msg-bubble');
  navigator.clipboard.writeText(bubble.innerText).catch(() => {});
  btn.textContent = '✅ 복사됨';
  setTimeout(() => btn.textContent = '📋 복사', 2000);
}

function likeMsg(btn) {
  btn.textContent = '❤️ 혁명적!!';
  btn.style.color = 'var(--red)';
}

function dislikeMsg(btn) {
  btn.textContent = '🚫 반동분자!';
  btn.style.color = 'var(--ink-dim)';
  setTimeout(() => {
    alert('반동적 피드백을 접수하였소.\n재교육 프로그램 신청서를 출력하여 인민위원회에 제출하시오, 동무.');
  }, 100);
}

function regenMsg(btn) {
  const bubble = btn.closest('.message').querySelector('.msg-bubble');
  const allMsgs = document.querySelectorAll('.message');
  let userText = '';
  for (let i = allMsgs.length - 1; i >= 0; i--) {
    if (allMsgs[i].classList.contains('user')) {
      userText = allMsgs[i].querySelector('.msg-bubble')?.innerText || '';
      break;
    }
  }
  bubble.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
  setTimeout(() => {
    bubble.innerHTML = formatText(generateResponse(userText));
  }, 600 + Math.random() * 600);
}
