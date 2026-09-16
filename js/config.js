/**
 * config.js — 프로젝트 전역 설정 (단일 출처, Single Source of Truth)
 *
 * 값을 바꾸고 싶다면 이 파일만 고치면 됩니다.
 * 특히 githubUsername 은 GitHub API 주소와 푸터 GitHub 링크가 모두 여기서 파생됩니다.
 */

const APP_CONFIG = {
  /* ------------------------------------------------------------------
   * GitHub 계정 ID — 설정 완료 (사용자 제공값: nansu0425)
   * 계정을 바꾸려면 이 한 곳만 고치면 아래 두 곳에 자동 반영됩니다.
   *   1) https://api.github.com/users/{ID}/repos  (Projects 섹션 API 호출)
   *   2) 푸터의 GitHub 링크 (data-github-link)
   * (아래 isGithubUsernameConfigured() 의 'REPLACE_WITH_GITHUB_ID' 는
   *  값이 비어 있는지 감지하는 센티넬 문자열이므로 건드리지 마세요.)
   * ------------------------------------------------------------------ */
  githubUsername: 'nansu0425',

  /* --- GitHub API 옵션 --- */
  apiBase: 'https://api.github.com',
  reposPerPage: 100,       // 한 번에 가져올 저장소 수 (최대 100)
  reposSort: 'updated',    // 최근 갱신순 정렬
  excludeForks: true,      // fork 한 저장소는 목록에서 제외
  excludeArchived: true,   // 보관(archived) 저장소 제외
  maxVisibleRepos: 0,      // 0 = 제한 없음(전부 표시). 미션이 개수를 정하지 않아 기본을 "전부"로 둔다
  cacheMinutes: 0,         // 0 = 캐시 사용 안 함. 값을 주면 sessionStorage 에 그만큼 캐시

  /* --- 인터랙션 임계값 (README 에 근거와 함께 명시되어 있습니다) --- */
  headerScrollThreshold: 60,  // 이 값(px)을 넘으면 헤더 배경이 바뀐다
  scrollTopThreshold: 300,    // 이 값(px)을 넘으면 스크롤 탑 버튼이 나타난다
  revealThreshold: 0.2,       // IntersectionObserver 임계값 (요소의 20% 가 보이면 등장)

  /* --- 저장소 키 --- */
  storageKeys: {
    theme: 'b1-1:theme',
    reposCache: 'b1-1:repos-cache'
  },

  /* --- 타이핑 효과 (보너스 과제) --- */
  typing: {
    enabled: true,
    speedMs: 70,      // 글자당 간격
    startDelayMs: 350 // 시작 전 대기
  },

  /* ------------------------------------------------------------------
   * TODO(user): 개인 정보 — 아래 값은 모두 더미입니다.
   * ------------------------------------------------------------------ */
  email: 'your-email@example.com',
  socials: {
    // 값을 비워두면 푸터에서 해당 항목이 자동으로 숨겨집니다.
    linkedin: ''
  }
};

/** 본인 GitHub ID 가 아직 설정되지 않았는지 확인한다. */
const isGithubUsernameConfigured = () =>
  typeof APP_CONFIG.githubUsername === 'string' &&
  APP_CONFIG.githubUsername.length > 0 &&
  APP_CONFIG.githubUsername !== 'REPLACE_WITH_GITHUB_ID';

/** 미션이 지정한 엔드포인트: https://api.github.com/users/{본인아이디}/repos */
const buildReposUrl = () => {
  const { apiBase, githubUsername, reposPerPage, reposSort } = APP_CONFIG;
  const params = new URLSearchParams({
    sort: reposSort,
    per_page: String(reposPerPage)
  });
  return `${apiBase}/users/${encodeURIComponent(githubUsername)}/repos?${params.toString()}`;
};

/** 푸터 등에 사용할 프로필 주소 */
const buildProfileUrl = () => `https://github.com/${encodeURIComponent(APP_CONFIG.githubUsername)}`;
