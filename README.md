# 나를 소개하는 웹페이지 (B1-1)

> Codyssey · AI 도구 학습 / 웹 기초와 프론트엔드 · 미션 B1-1
> **외부 라이브러리 · 프레임워크 · CDN 없이** 순수 HTML · CSS · JavaScript 만으로 만든 반응형 포트폴리오 웹사이트입니다.
> 미션 원문 전문은 **[MISSION.md](MISSION.md)** 에 있습니다.

---

## 1. 배포 URL

<!-- TODO(user): GitHub Pages 배포가 끝나면 아래 주소를 실제 주소로 바꾸세요. 절차는 DEPLOY.md 참고 -->

| 항목 | 주소 |
|---|---|
| 배포 사이트 | `https://{GITHUB_ID}.github.io/{REPO_NAME}/` **(← 배포 후 교체)** |
| GitHub 저장소 | `https://github.com/{GITHUB_ID}/{REPO_NAME}` **(← 배포 후 교체)** |

> `{GITHUB_ID}` 는 `nansu0425`, `{REPO_NAME}` 은 이 폴더 이름과 같은 **`b1-1-portfolio`** 를 권장합니다.
> 그대로 쓰면 배포 주소는 `https://nansu0425.github.io/b1-1-portfolio/` 가 됩니다.
> GitHub 에서 다른 이름으로 저장소를 만들었다면 그 이름으로 바꿔 주세요. 교체 절차는 [DEPLOY.md](./DEPLOY.md) 4번입니다.

---

## 2. 프로젝트 설명

브라우저가 이해하는 유일한 세 가지 언어(HTML · CSS · JavaScript)만으로 자기소개 페이지를 처음부터 끝까지 만들었습니다.
화면을 그리는 것에서 멈추지 않고, **"사용자 이벤트 → 상태 변경 → DOM 업데이트"** 라는 웹의 동작 원리가
코드에서 그대로 드러나도록 구조를 잡은 것이 이 프로젝트의 핵심입니다.

각 기능 모듈은 예외 없이 아래 세 조각으로만 이루어져 있습니다.

```text
① state        (이 기능이 기억해야 하는 값)
② render()     (state 를 화면에 반영하는 단 하나의 함수)
③ 이벤트 핸들러 (DOM 을 직접 만지지 않고 state 만 바꾼 뒤 render() 를 부른다)
```

이 구조는 다음 미션에서 배울 React 의 `state → re-render` 흐름과 같은 모양입니다.

### 구현한 기능

| 구분 | 내용 |
|---|---|
| 섹션 | Hero / About / Skills / Projects / Contact / Footer |
| 반응형 | 모바일 퍼스트 + 768px(태블릿) · 1024px(데스크톱) 브레이크포인트 |
| 인터랙션 | 햄버거 메뉴, 부드러운 스크롤, 스크롤 탑 버튼, 헤더 배경 변경, 스크롤 등장 애니메이션 |
| 다크 모드 | 토글 + `localStorage` 저장 + 시스템 설정(`prefers-color-scheme`) 감지 |
| 외부 API | GitHub REST API 로 저장소 목록을 불러와 카드로 렌더링 (로딩 / 성공 / 에러 / 빈 상태) |
| 폼 | 이름 · 이메일 · 메시지 유효성 검사, 필드 옆 에러 메시지, 성공 메시지 |
| 접근성 | 시맨틱 랜드마크, skip link, `aria-*` 속성, 키보드 전용 조작, `:focus-visible` |
| 보너스 | 언어별 프로젝트 필터, Hero 타이핑 효과, 시스템 다크 모드 감지 |

---

## 3. 사용 기술

| 분류 | 사용 기술 |
|---|---|
| 마크업 | HTML5 시맨틱 태그 (`header` `nav` `main` `section` `article` `footer`) |
| 스타일 | CSS3 — 사용자 정의 속성(`:root` 변수), Flexbox, Grid(`auto-fit` + `minmax`), 미디어 쿼리, `@keyframes`, `backdrop-filter` |
| 스크립트 | Vanilla JavaScript (ES6+) — `const`/`let`, 화살표 함수, 템플릿 리터럴, 구조분해 할당, `map`/`filter`/`forEach`, `fetch` + `async`/`await`, `try`/`catch` |
| 브라우저 API | DOM(`querySelector`, `classList`, `textContent`, `innerHTML`), `addEventListener`, `localStorage`, `sessionStorage`, `IntersectionObserver`, `matchMedia`, `requestAnimationFrame`, `History` |
| 외부 API | GitHub REST API — `GET https://api.github.com/users/{id}/repos` |
| 개발 환경 | VS Code + Live Server |
| 배포 | GitHub Pages (정적 호스팅) |

**사용하지 않은 것:** React / Vue / jQuery / Bootstrap / Tailwind 등 모든 프레임워크와 라이브러리,
npm · 번들러 · 빌드 단계, 그리고 **모든 CDN 링크**.
미션 개발환경 항목은 Font Awesome(아이콘)과 Google Fonts(웹폰트)를 "허용"하지만,
이 프로젝트는 외부 요청을 0건으로 만들기 위해 **인라인 SVG 스프라이트 + OS 기본 폰트 스택**으로 대체했습니다.
덕분에 오프라인에서도 아이콘과 서체가 깨지지 않고, 초기 로딩에 외부 요청이 필요 없습니다.

---

## 4. 스크린샷

<!-- TODO(user): DEPLOY.md 5번 절차대로 스크린샷 3장을 찍어
     images/screenshots/ 에 아래 파일명으로 저장하면 그대로 표시됩니다. -->

| 데스크톱 (라이트) | 모바일 | 다크 모드 |
|---|---|---|
| ![데스크톱 화면](./images/screenshots/desktop-light.png) | ![모바일 화면](./images/screenshots/mobile.png) | ![다크 모드 화면](./images/screenshots/desktop-dark.png) |

> 아직 이미지 파일이 없으면 깨진 이미지로 보입니다. 스크린샷을 추가하면 자동으로 채워집니다.

---

## 5. 인터랙션 임계값 (미션 요구: README 에 명시)

모두 `js/config.js` 한 곳에서 관리하며, 값을 바꾸면 전체 동작에 반영됩니다.

| 항목 | 값 | 설정 위치 | 선택한 이유 |
|---|---|---|---|
| 스크롤 탑 버튼 노출 | **300px** | `APP_CONFIG.scrollTopThreshold` | 모바일 한 화면(약 700px)의 절반 이하 지점. 아직 Hero 가 보이는 동안에는 버튼이 필요 없고, 첫 화면을 벗어나기 시작할 때 자연스럽게 나타난다. |
| 헤더 배경색 변경 | **60px** | `APP_CONFIG.headerScrollThreshold` | 헤더 높이(60~68px)와 비슷한 값. "헤더가 콘텐츠 위로 올라탄 순간" 배경과 그림자가 생겨 글자가 배경에 묻히지 않는다. |
| 등장 애니메이션 임계값 | **0.2** | `APP_CONFIG.revealThreshold` | 미션 권장값(0.2 이상). 요소의 20% 가 보이면 재생하므로, 화면 하단에 살짝 걸친 큰 카드도 스크롤을 멈추기 전에 자연스럽게 나타난다. 값이 더 크면 긴 요소가 끝까지 안 보일 수 있다. |

그 밖의 조정 가능한 값: `maxVisibleRepos`(표시 카드 수 상한, **기본 0 = 제한 없이 전부 표시**),
`excludeForks`/`excludeArchived`(fork·보관 저장소 제외), `cacheMinutes`(0 이면 캐시 사용 안 함), `typing.speedMs`(타이핑 속도).

> Projects 섹션은 fork·보관 저장소를 뺀 **공개 저장소를 전부** 최근 갱신순으로 보여 줍니다.
> 미션이 표시 개수를 정하지 않았고, 개수를 임의로 자르면 사용자의 저장소가 목록과 언어 필터에서
> 소리 없이 빠지기 때문입니다. 카드가 너무 많다면 `maxVisibleRepos` 에 원하는 숫자를 넣으면 됩니다.

---

## 6. 직접 채워야 하는 값 (사용자 확인 필요)

| # | 항목 | 현재 값 | 교체할 위치 | 필수 |
|---|---|---|---|---|
| 1 | **GitHub 계정 ID** | `nansu0425` (설정 완료) | `js/config.js` → `APP_CONFIG.githubUsername` **(이 한 곳만 고치면 API 주소와 푸터 링크가 모두 바뀝니다)** | ✅ 완료 |
| 2 | 이름 표기 | `허준` | `index.html` — `<title>`, `<meta name="author">`, Hero `<h1>`, About 캡션, 푸터 저작권 | 확인 |
| 3 | 한 줄 소개 | `웹과 AI를 함께 배우는 개발자` | `index.html` — `#hero-typing` 의 `data-typing-text` 와 표시 텍스트 (두 곳 모두) | 확인 |
| 4 | 자기소개 본문 | 더미 2문단 + 3줄 요약 | `index.html` — `.about__body` 의 `<p>` 2개, `.about__facts` | 확인 |
| 5 | 프로필 사진 | `images/profile.svg` (이니셜 자리표시) | 사진 파일 추가 후 `index.html` `.about__photo` 의 `src` / `alt` | 확인 |
| 6 | 기술 스택 | 더미 12개 | `index.html` — `#skills` 의 `.skills__list` | 확인 |
| 7 | 이메일 | `your-email@example.com` | `js/config.js` → `APP_CONFIG.email` (About·푸터 링크가 여기서 파생) + `index.html` 의 표시 텍스트 | 확인 |
| 8 | LinkedIn 등 소셜 | 빈 값(푸터에서 자동 숨김) | `js/config.js` → `APP_CONFIG.socials.linkedin` | 선택 |
| 9 | 배포 URL | `{GITHUB_ID}` 자리표시 | 이 문서 1번 표 | ✅ 필수 |
| 10 | 스크린샷 3장 | 없음 | `images/screenshots/desktop-light.png`, `mobile.png`, `desktop-dark.png` | ✅ 필수 |

> 코드 안에서는 `TODO(user)` 로 검색하면 교체할 위치를 모두 찾을 수 있습니다.

---

## 7. 폴더 구조

```text
b1-1-portfolio/             (저장소 루트 = 사이트 루트)
├── index.html              메인 페이지 (시맨틱 마크업 + 인라인 SVG 아이콘 스프라이트)
├── README.md               이 문서
├── DEPLOY.md               GitHub Pages 배포 절차 (사용자가 직접 실행)
├── css/
│   └── style.css           디자인 토큰 → 리셋 → 컴포넌트 → 반응형 (단일 스타일시트)
├── js/
│   ├── config.js           모든 설정 상수 (GitHub ID · 임계값 · 개인정보)
│   ├── utils.js            $$ , escapeHtml , rafThrottle , formatDate 도우미
│   ├── theme.js            다크 모드 (상태 → localStorage → 렌더)
│   ├── nav.js              햄버거 메뉴 · 부드러운 스크롤 · 현재 섹션 표시
│   ├── scroll.js           헤더 배경 변경(60px) · 스크롤 탑 버튼(300px)
│   ├── reveal.js           IntersectionObserver 등장 애니메이션(0.2)
│   ├── projects.js         GitHub API + 로딩/성공/에러/빈 상태 + 언어 필터
│   ├── form.js             Contact 폼 유효성 검사
│   ├── typing.js           Hero 타이핑 효과 (보너스)
│   └── main.js             각 모듈 init() 호출 (부트스트랩)
├── images/
│   ├── profile.svg         프로필 자리표시 이미지
│   ├── favicon.svg         파비콘
│   └── screenshots/        제출용 스크린샷 3장을 넣는 곳
├── MISSION.md              미션 원문 사본 (수정하지 않는 원본 보존 파일)
├── .nojekyll               GitHub Pages 의 Jekyll 처리 비활성화
│                           (게시 소스의 루트에 있어야 효과가 있으므로 저장소 루트에 둔다)
├── .gitignore              커밋하지 않을 파일 목록
└── .vscode/                Live Server 등 개발 환경 설정 (추천 확장 포함)
```

> 이 미션은 원래 여러 미션을 한 저장소에 모아 두고 미션마다 폴더 하나를 쓰는 구조였지만,
> 미션별 독립 저장소로 분리하면서 그 폴더 안의 내용물이 **그대로 저장소 루트**가 되었습니다.

---

## 8. 로컬에서 실행하기 (VS Code + Live Server)

1. VS Code 에서 **저장소 루트 폴더**(`b1-1-portfolio`)를 엽니다.
2. 확장 탭에서 **Live Server**(`ritwickdey.liveserver`)를 설치합니다.
   저장소의 `.vscode/extensions.json` 에 추천으로 등록되어 있어 설치 알림이 뜹니다.
3. 상태 표시줄 오른쪽 아래의 **Go Live** 를 누릅니다.
   `.vscode/settings.json` 에 `"liveServer.settings.root": "/"` 가 지정되어 있어
   `http://127.0.0.1:5500/` 로 바로 저장소 루트의 `index.html` 이 열립니다.
4. 파일을 저장하면 브라우저가 자동으로 새로고침됩니다.

> `index.html` 을 더블클릭해 `file://` 로 열어도 대부분 동작합니다.
> (ES Modules 대신 일반 script + `defer` 를 쓴 이유 중 하나입니다.)
> 다만 GitHub API 호출과 캐시 동작은 `http://` 환경에서 확인하는 것을 권장합니다.

### GitHub API 사용 시 주의

비로그인 상태의 GitHub API 는 **IP 당 시간당 60회** 제한이 있습니다.
개발 중 새로고침을 반복하면 `403` 응답과 함께 "요청 한도를 넘었습니다" 에러 UI 가 보일 수 있습니다.
이때는 잠시 기다리거나, `js/config.js` 의 `cacheMinutes` 를 `10` 정도로 올려 `sessionStorage` 캐시를 켜면 됩니다.

---

## 9. 과제 목표 자문자답 (미션 3장)

### Q1. HTML 에서 시맨틱 태그를 왜 사용하는가? 어떤 기준으로 구조를 설계했는가?

`div` 는 "여기 박스가 있다"는 것 외에 아무 의미가 없습니다.
반면 시맨틱 태그는 **문서의 구조를 기계(스크린리더 · 검색엔진 · 브라우저 리더 모드)에게 설명**합니다.
스크린리더 사용자는 랜드마크(`header`/`nav`/`main`/`footer`)만 골라 이동할 수 있고,
검색엔진은 `h1 → h2 → h3` 위계로 문서의 주제를 파악합니다.

설계 기준은 세 가지였습니다.

1. **페이지에 한 번만 존재하는 큰 영역은 랜드마크로.**
   상단 고정 영역 → `header`, 메뉴 → `nav`, 본문 전체 → `main`, 하단 → `footer`.
2. **"제목을 붙일 수 있는 주제 묶음"은 `section` + `aria-labelledby`.**
   About / Skills / Projects / Contact 는 각각 `h2` 를 가지며, `aria-labelledby` 로 그 제목과 연결했습니다.
   그래서 스크린리더가 "About, 영역"처럼 이름을 읽어 줍니다.
3. **그 자체로 떼어내도 말이 되는 독립 콘텐츠는 `article`.**
   GitHub 저장소 카드 한 장과 Skills 그룹 한 덩어리는 다른 곳에 옮겨 놓아도 의미가 유지되므로 `article` 로 감쌌습니다.

`h1` 은 페이지 전체에 하나(Hero 의 인사말)만 두고, 각 섹션 제목을 `h2`, 카드 제목을 `h3` 로 두어 위계를 건너뛰지 않았습니다.

### Q2. Flexbox 와 Grid 의 차이, 언제 무엇을 선택하는가?

- **Flexbox 는 1차원**입니다. 한 줄(또는 한 열) 안에서 항목들을 어떻게 나눠 배치할지 정합니다.
  크기는 **콘텐츠가 먼저 정하고** 남는 공간을 어떻게 분배할지 컨테이너가 조정합니다.
- **Grid 는 2차원**입니다. 행과 열을 **먼저 정의해 놓고** 그 칸에 항목을 넣습니다.

선택 기준은 **"정렬해야 할 축이 하나인가, 둘인가"** 입니다.

| 이 프로젝트에서 | 선택 | 이유 |
|---|---|---|
| 헤더 (로고 왼쪽 ↔ 메뉴·토글 오른쪽) | Flex | 한 줄 안에서의 양끝 정렬. `justify-content: space-between` 한 줄로 끝난다. |
| Hero 버튼 2개, 카드의 메타 정보 줄, 푸터 링크 | Flex | 한 줄 나열 + `flex-wrap` 으로 좁으면 자연스럽게 줄바꿈. |
| Projects 카드 목록 | Grid | `repeat(auto-fit, minmax(260px, 1fr))` 하나로 미디어 쿼리 없이 1열 → 2열 → 3열이 자동 결정된다. 카드 높이도 행 단위로 맞춰진다. |
| About (사진 + 본문) | Grid | 열 너비를 `320px 1fr` 처럼 **명시적으로** 정하고 싶었다. Flex 로는 `flex-basis` 계산이 번거롭다. |

즉 **"항목들을 흐르게 두고 싶으면 Flex, 칸을 먼저 만들고 채우고 싶으면 Grid"** 로 정리할 수 있습니다.

### Q3. `querySelector` 로 DOM 을 선택하고 `addEventListener` 로 이벤트를 연결하는 흐름

```javascript
// 1) 선택 — CSS 선택자 문법 그대로 요소를 찾는다
const toggleButton = document.querySelector('#nav-toggle');

// 2) 연결 — "이 요소에서 click 이 일어나면 이 함수를 실행해"라고 등록한다
toggleButton.addEventListener('click', () => setMenuOpen(!state.isMenuOpen));

// 3) 실행 — 핸들러는 상태만 바꾸고, 화면을 고치는 일은 render() 가 한다
```

`querySelector` 는 첫 번째 요소 하나를, `querySelectorAll` 은 조건에 맞는 전부(NodeList)를 돌려줍니다.
NodeList 에는 `map`/`filter` 가 없어서 `Array.from()` 으로 배열로 바꾸는 도우미(`$$`)를 만들어 썼습니다.

HTML 에 `onclick="..."` 을 쓰지 않고 `addEventListener` 를 쓰는 이유는

- 같은 이벤트에 **핸들러를 여러 개** 붙일 수 있고 (`onclick` 은 마지막 하나가 앞의 것을 덮어씁니다),
- **구조(HTML)와 동작(JS)이 분리**되어 어떤 동작이 어디 붙어 있는지 JS 파일만 보면 되며,
- `{ passive: true }`, `{ once: true }`, `capture` 같은 **옵션**을 쓸 수 있고 `removeEventListener` 로 해제할 수 있기 때문입니다.

한 가지 더, 다시 그려지는 영역(GitHub 카드, 재시도 버튼)에는 **이벤트 위임**을 썼습니다.
버튼 하나하나에 리스너를 붙이면 `innerHTML` 로 다시 그리는 순간 리스너가 사라지지만,
부모 컨테이너에 한 번만 붙이고 `event.target.closest('[data-action="retry"]')` 로 확인하면
몇 번을 다시 그려도 계속 동작합니다.

### Q4. 화살표 함수 · 구조분해 할당 · 배열 메서드는 왜 필요한가?

**화살표 함수**는 짧게 쓰기 위한 문법이기도 하지만, 진짜 이유는 **`this` 를 새로 만들지 않는다**는 점입니다.
콜백 안에서 바깥 스코프의 값을 그대로 쓸 수 있어 `const self = this` 같은 우회가 필요 없습니다.
이 프로젝트의 모든 이벤트 핸들러와 `map`/`forEach` 콜백이 화살표 함수입니다.

**구조분해 할당**은 필요한 값만 이름을 붙여 꺼내 코드의 의도를 드러냅니다.
GitHub 응답은 필드가 70개가 넘는데, 카드에 쓰는 건 6~7개뿐입니다.

```javascript
const {
  name, description, html_url: htmlUrl,
  stargazers_count: stars, language, updated_at: updatedAt
} = repo;
```

`html_url` 같은 snake_case 를 `htmlUrl` 로 **이름을 바꿔 받을 수 있다는 점**도 유용합니다.
함수 옵션에도 써서 `const { returnFocus = false } = options;` 처럼 기본값을 함께 선언했습니다.

**배열 메서드**는 "무엇을 할지"를 드러냅니다. `for` 문은 인덱스 관리라는 잡음이 섞이지만,
`map`(변환) · `filter`(선별) · `forEach`(순회)는 이름만으로 목적이 읽힙니다. 또 원본을 바꾸지 않습니다.

```javascript
const repos = data
  .filter((repo) => !repo.fork)        // fork 는 제외
  .filter((repo) => !repo.archived);   // 보관된 것도 제외

gridElement.innerHTML = visibleRepos.map(createCardHtml).join('');  // 데이터 → HTML
FIELD_NAMES.forEach((fieldName) => validateField(fieldName));       // 전부 순회하며 검사
```

### Q5. `fetch` 와 `async/await` 로 비동기 데이터를 가져오고, 상태를 어떻게 UI 로 표현했는가?

네트워크 요청은 **언제 끝날지 모릅니다.** 그래서 `fetch` 는 결과 대신 Promise 를 즉시 돌려주고,
`await` 는 "이 Promise 가 끝날 때까지 이 함수만 잠시 멈춰 있어라"라고 지시합니다.
덕분에 콜백 중첩 없이 위에서 아래로 읽히는 코드가 되고, 실패는 `try/catch` 로 동기 코드처럼 잡을 수 있습니다.

핵심은 **"요청 중"도 하나의 상태로 취급**하는 것입니다. 상태를 4가지로 정의하고, 화면은 오직 그 상태만 보고 그립니다.

```javascript
const state = { status: 'idle', repos: [], filter: 'all', error: null };

const loadProjects = async () => {
  setState({ status: 'loading' });                 // → 스피너 + "불러오는 중..."
  try {
    const response = await fetch(buildReposUrl());
    if (!response.ok) { throw ... }                // 404 / 403(레이트 리밋) 구분
    const repos = selectRepos(await response.json());
    setState({ status: repos.length > 0 ? 'success' : 'empty', repos });
  } catch (error) {
    setState({ status: 'error', error: ... });     // → 메시지 + [다시 시도]
  }
};
```

| 상태 | 화면 |
|---|---|
| `loading` | CSS `@keyframes` 스피너 + "프로젝트를 불러오는 중..." |
| `success` | `<article class="card">` 카드 그리드 |
| `empty` | "표시할 프로젝트가 없습니다." |
| `error` | "프로젝트를 불러올 수 없습니다" + 원인별 안내 + **[다시 시도]** 버튼 |

`fetch` 의 함정 하나를 짚고 넘어가면, **404 나 403 은 `catch` 로 가지 않습니다.**
서버가 응답을 "성공적으로" 돌려준 것이기 때문입니다. 그래서 `response.ok` 를 직접 확인해
직접 `throw` 해야 에러 상태로 넘어갑니다. 레이트 리밋은 `403` + 응답 헤더 `X-RateLimit-Remaining === '0'`
조합으로 판별해 "시간당 60회 한도를 넘었습니다"라는 다른 문구를 보여 줍니다.

상태 영역에는 `role="status" aria-live="polite"` 를 붙여, 화면을 못 보는 사용자에게도
로딩·에러 상태가 소리로 전달되게 했습니다.

### Q6. "하나의 기능"에서 이벤트 → 상태 변경 → DOM 업데이트는 어떻게 연결되는가?

가장 짧은 예로 다크 모드를 보면 이렇습니다.

```text
[이벤트]  토글 버튼 click
   ↓
[상태]    state.theme : 'light' → 'dark'  (+ localStorage 에 저장)
   ↓
[렌더]    render() 가 <html data-theme="dark"> 를 설정
   ↓
[화면]    CSS 변수 묶음이 통째로 교체되어 전체 색이 바뀐다
```

중요한 규칙은 **핸들러가 DOM 을 직접 고치지 않는다**는 것입니다.
핸들러가 `body.style.background = '#000'` 같은 일을 직접 하기 시작하면,
"지금 화면이 왜 이 모양인지"를 알려면 흩어진 모든 핸들러를 다 읽어야 합니다.
상태를 단일 출처로 두면 **화면은 언제나 state 의 함수**가 되고, 디버깅은 state 만 확인하면 됩니다.

이 프로젝트에는 같은 모양의 흐름이 5개 있습니다.

| # | 이벤트 | 상태 변화 | 화면 변화 | 파일 |
|---|---|---|---|---|
| 1 | 테마 토글 click | `theme: light ↔ dark` | `<html data-theme>` → 전체 색상 | `js/theme.js` |
| 2 | 페이지 진입 / [다시 시도] click | `status: loading → success \| empty \| error` | Projects 섹션 전체 | `js/projects.js` |
| 3 | 폼 input / submit | `errors`, `touched`, `successMessage` | 필드별 에러 문구 · 성공 메시지 | `js/form.js` |
| 4 | 햄버거 click / Esc / 바깥 클릭 | `isMenuOpen: false ↔ true` | `.active` 클래스 → 메뉴 표시 | `js/nav.js` |
| 5 | 언어 필터 click (보너스) | `filter: 'all' → 'JavaScript'` | 카드 목록 재렌더 | `js/projects.js` |

React 를 배우면 `state` 를 `useState` 가, `render()` 호출을 리액트 런타임이 대신해 줍니다.
지금 손으로 쓴 `setState → render` 가 그때 자동으로 일어나는 일의 정체입니다.

---

## 10. 구현 메모 (선택한 방법과 이유)

- **ES Modules 대신 일반 script + `defer`**
  미션이 "`defer` 속성으로 연결"을 요구하고, `defer` 는 문서 파싱을 막지 않으면서 **작성 순서대로** 실행을 보장합니다.
  각 파일은 `const Nav = (() => { ... return { init }; })();` 형태의 IIFE 라서 전역에 이름 하나만 노출됩니다.
  번들러가 필요 없고 `file://` 로 열어도 동작합니다.
- **`innerHTML` 을 쓰는 곳과 `textContent` 를 쓰는 곳**
  카드 묶음처럼 구조가 있는 HTML 은 템플릿 리터럴 + `innerHTML` 로, 에러·성공 문구처럼 순수한 글자는 `textContent` 로 넣습니다.
  `innerHTML` 에 들어가는 GitHub 데이터(이름 · 설명 · 토픽)는 전부 `escapeHtml()` 을 거쳐 XSS 를 막습니다.
- **스크롤 위치 계산은 `IntersectionObserver` 로**
  "지금 어느 섹션을 보고 있는가"를 `scroll` 이벤트에서 `getBoundingClientRect()` 로 계산하면 매 프레임 레이아웃을 강제로 계산하게 됩니다.
  브라우저가 최적화해 주는 `IntersectionObserver` 에 맡기고, `scroll` 이벤트는 단순 비교(60px/300px)만 하도록 `rafThrottle` + `{ passive: true }` 로 가볍게 유지했습니다.
- **다크 모드 첫 화면 깜빡임(FOUC) — 줄였지만 완전히 없애지는 못했습니다**
  모든 JS 를 `defer` 로 연결하므로, 첫 페인트는 `theme.js` 가 실행되기 **전에** 일어납니다.
  CSS 에 `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }` 를 두어
  JS 없이도 **OS 설정**은 첫 페인트에 반영되게 했습니다. (보너스 과제 "시스템 다크 모드 감지"도 여기서 함께 충족합니다.)
  다만 CSS 는 `localStorage` 를 읽을 수 없으므로 **저장된 선택은 첫 페인트에 반영되지 않습니다.**

  - 저장된 값이 **없을 때** → OS 설정대로 그려짐 → 깜빡임 없음
  - 저장된 값이 **OS 설정과 같을 때** → 그대로 그려짐 → 깜빡임 없음
  - 저장된 값이 **OS 설정과 다를 때** (예: OS 다크 + 라이트 선택) → 한순간 **반대 테마**로 그려진 뒤 `theme.js` 가 뒤집음

  마지막 경우를 없애려면 `<head>` 안에서 `localStorage` 를 읽는 **인라인 스크립트**가 필요한데,
  미션이 "JavaScript 파일을 `defer` 속성으로 연결"할 것을 요구하므로 그 절충을 택하지 않았습니다.
  FOUC 무결은 미션 요구사항이 아니며, 화면이 최종적으로 도달하는 상태는 항상 사용자가 고른 테마입니다.
- **애니메이션 안전장치**
  `.reveal` 의 "투명하게 숨김" 상태는 `<html class="reveal-ready">` 가 있을 때만 적용됩니다.
  이 클래스는 `reveal.js` 가 붙이므로, JS 가 실패해도 본문이 통째로 안 보이는 사고가 나지 않습니다.
  OS 의 "동작 줄이기" 설정이 켜져 있으면 등장 애니메이션과 타이핑 효과를 건너뛰고 즉시 최종 상태를 보여 줍니다.
- **폼에 `novalidate`**
  미션이 "에러 메시지를 입력 필드 근처에 표시"를 요구하므로, 브라우저 기본 말풍선 대신 항상 우리 UI 가 보이도록 했습니다.
  `required` 속성 자체는 접근성(의미 전달)을 위해 그대로 남겨 두었습니다.

---

## 11. 배포

GitHub Pages 배포 절차는 **[DEPLOY.md](./DEPLOY.md)** 에 단계별로 정리해 두었습니다.

모든 자산을 `./css/style.css` 같은 **상대경로**로 연결했기 때문에
저장소 하위 경로(`/{REPO_NAME}/`)에 배포해도 CSS · JS · 이미지가 404 없이 로드됩니다.

`.nojekyll` 은 **저장소 루트**(`b1-1-portfolio/.nojekyll`)에 있습니다.
GitHub Pages 는 게시 소스의 **루트에 있는** `.nojekyll` 만 인식하는데, 이 저장소는 루트가 곧 사이트 루트라
이 파일이 정확히 인식되는 위치에 있습니다.
다만 이 프로젝트에는 `_` 로 시작하는 파일·폴더가 없어, 이 파일이 없더라도 실제로 누락되는 자산은 없습니다.
(Jekyll 이 `_` 로 시작하는 경로를 건너뛰는 것을 막기 위한 안전장치입니다.)
