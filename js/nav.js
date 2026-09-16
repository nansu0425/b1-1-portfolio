/**
 * nav.js — 햄버거 메뉴 토글 + 앵커 부드러운 스크롤 + 현재 섹션 표시
 *
 * [상태 → 렌더링 흐름 #4]
 *   햄버거 버튼 클릭
 *     → state.isMenuOpen 이 뒤집힌다
 *       → render() 가 classList.toggle('active') 와 aria-expanded 를 갱신한다
 *         → CSS 가 메뉴 패널을 보여주거나 숨긴다
 */
const Nav = (() => {
  const state = {
    isMenuOpen: false,
    currentSectionId: 'hero'
  };

  const DESKTOP_QUERY = '(min-width: 768px)';

  let navElement = null;
  let toggleButton = null;
  let navLinks = [];
  let desktopQuery = null;

  /** 상태를 화면에 반영하는 단 하나의 함수 */
  const render = () => {
    if (!navElement || !toggleButton) {
      return;
    }

    /* 미션 요구사항: classList.toggle('active') 로 메뉴를 열고 닫는다 */
    navElement.classList.toggle('active', state.isMenuOpen);
    document.body.classList.toggle('is-menu-open', state.isMenuOpen);

    toggleButton.setAttribute('aria-expanded', String(state.isMenuOpen));
    toggleButton.setAttribute('aria-label', state.isMenuOpen ? '메뉴 닫기' : '메뉴 열기');

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${state.currentSectionId}`;
      link.classList.toggle('is-current', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const setMenuOpen = (isOpen) => {
    state.isMenuOpen = isOpen;
    render();
  };

  const closeMenu = (options = {}) => {
    const { returnFocus = false } = options;
    if (!state.isMenuOpen) {
      return;
    }
    setMenuOpen(false);
    if (returnFocus && toggleButton) {
      toggleButton.focus();
    }
  };

  /** 페이지 내부 앵커 클릭 → 기본 점프를 막고 부드럽게 이동 */
  const handleAnchorClick = (event) => {
    const link = event.currentTarget;
    const hash = link.getAttribute('href');
    const target = document.querySelector(hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMenu();

    target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });

    /* 주소창의 해시도 갱신하되, 브라우저 기본 점프는 일어나지 않게 pushState 를 쓴다 */
    window.history.pushState(null, '', hash);

    /* 키보드 사용자를 위해 포커스도 이동시킨다 */
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  };

  const handleDocumentClick = (event) => {
    if (!state.isMenuOpen || !navElement) {
      return;
    }
    if (!navElement.contains(event.target)) {
      closeMenu();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeMenu({ returnFocus: true });
    }
  };

  /** 데스크톱 폭으로 넓어지면 열려 있던 모바일 메뉴 상태를 정리한다 */
  const handleViewportChange = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  /**
   * 현재 보고 있는 섹션을 네비게이션에 표시한다.
   * 스크롤마다 getBoundingClientRect() 를 계산하는 대신 IntersectionObserver 를 쓴다.
   */
  const observeSections = () => {
    const sections = $$('main section[id]');
    if (sections.length === 0 || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          state.currentSectionId = entry.target.id;
          render();
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  };

  const init = () => {
    navElement = document.querySelector('#primary-nav');
    toggleButton = document.querySelector('#nav-toggle');
    navLinks = $$('.nav__link');
    desktopQuery = window.matchMedia(DESKTOP_QUERY);

    if (toggleButton) {
      toggleButton.addEventListener('click', () => setMenuOpen(!state.isMenuOpen));
    }

    /* 네비게이션 메뉴뿐 아니라 Hero 의 CTA 버튼, 로고까지 모두 부드럽게 이동한다 */
    const anchorLinks = $$('a[href^="#"]').filter(
      (link) => (link.getAttribute('href') || '').length > 1
    );
    anchorLinks.forEach((link) => {
      link.addEventListener('click', handleAnchorClick);
    });

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeydown);
    desktopQuery.addEventListener('change', handleViewportChange);

    observeSections();
    render();
  };

  /* closeMenu 는 이 모듈 안에서만 쓰인다(링크 클릭·Esc·바깥 클릭). 밖으로 내보내지 않는다. */
  return { init };
})();
