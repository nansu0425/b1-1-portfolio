/**
 * main.js — 부트스트랩
 *
 * 각 기능은 독립된 모듈(IIFE)로 나뉘어 있고, 이 파일이 순서대로 init() 을 호출한다.
 * 모든 스크립트를 defer 로 연결했기 때문에 이 파일이 실행되는 시점에는
 * HTML 파싱이 끝나 있고 앞선 모듈들도 모두 정의되어 있다.
 * (그래서 DOMContentLoaded 를 따로 기다릴 필요가 없다.)
 */
(() => {
  /** config 의 값을 HTML 의 정적인 부분에 주입한다. */
  const applyConfigToDom = () => {
    /* 푸터 저작권 연도 */
    const yearElement = document.querySelector('#footer-year');
    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }

    /* GitHub 프로필 링크 — 주소는 config.githubUsername 에서 파생된다 */
    if (isGithubUsernameConfigured()) {
      $$('[data-github-link]').forEach((link) => {
        link.href = buildProfileUrl();
      });
    }

    /* 이메일 링크와 표시 텍스트 */
    $$('[data-email-link]').forEach((link) => {
      link.href = `mailto:${APP_CONFIG.email}`;
      if (link.children.length === 0) {
        link.textContent = APP_CONFIG.email;
      }
    });

    /* 소셜 링크는 주소가 채워진 것만 보여 준다 */
    Object.entries(APP_CONFIG.socials).forEach(([key, url]) => {
      const item = document.querySelector(`[data-social-item="${key}"]`);
      const link = document.querySelector(`[data-social-link="${key}"]`);
      if (!item || !link) {
        return;
      }
      if (url) {
        link.href = url;
        item.hidden = false;
      } else {
        item.hidden = true;
      }
    });
  };

  const start = () => {
    applyConfigToDom();

    Theme.init();      // 다크 모드 (가장 먼저 — 첫 화면 깜빡임을 줄인다)
    Nav.init();        // 햄버거 메뉴 + 부드러운 스크롤
    ScrollFx.init();   // 헤더 배경 변경 + 스크롤 탑 버튼
    Reveal.init();     // 스크롤 등장 애니메이션
    Typing.init();     // Hero 타이핑 효과 (보너스)
    Projects.init();   // GitHub API 연동
    ContactForm.init(); // 폼 유효성 검사
  };

  start();
})();
