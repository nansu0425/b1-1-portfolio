/**
 * scroll.js — 스크롤 위치에 반응하는 두 가지 UI
 *   1) 스크롤 60px 이상  → 헤더 배경색 변경 (.is-scrolled)
 *   2) 스크롤 300px 이상 → 스크롤 탑 버튼 노출 (.is-visible)
 *
 * 임계값 60 / 300 은 js/config.js 에 있고 README 에 근거가 적혀 있습니다.
 *
 * [상태 → 렌더링 흐름]
 *   scroll 이벤트 → state 의 boolean 두 개가 바뀐다 → render() 가 클래스만 갱신
 */
const ScrollFx = (() => {
  const state = {
    isHeaderScrolled: false,
    isScrollTopVisible: false
  };

  let headerElement = null;
  let scrollTopButton = null;

  const render = () => {
    if (headerElement) {
      if (state.isHeaderScrolled) {
        headerElement.classList.add('is-scrolled');
      } else {
        headerElement.classList.remove('is-scrolled');
      }
    }

    if (scrollTopButton) {
      if (state.isScrollTopVisible) {
        scrollTopButton.classList.add('is-visible');
      } else {
        scrollTopButton.classList.remove('is-visible');
      }
      /* 숨겨져 있을 때는 키보드 탭 순서에서도 빠지게 한다 */
      scrollTopButton.tabIndex = state.isScrollTopVisible ? 0 : -1;
    }
  };

  /** 스크롤 위치를 읽어 상태를 갱신한다. 값이 그대로면 render 를 건너뛴다. */
  const syncFromScroll = () => {
    const offset = window.scrollY;
    const nextHeader = offset > APP_CONFIG.headerScrollThreshold;
    const nextButton = offset > APP_CONFIG.scrollTopThreshold;

    if (nextHeader === state.isHeaderScrolled && nextButton === state.isScrollTopVisible) {
      return;
    }

    state.isHeaderScrolled = nextHeader;
    state.isScrollTopVisible = nextButton;
    render();
  };

  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior() });
  };

  const init = () => {
    headerElement = document.querySelector('#site-header');
    scrollTopButton = document.querySelector('#scroll-top');

    if (scrollTopButton) {
      scrollTopButton.addEventListener('click', handleScrollTopClick);
    }

    /* passive: true → 브라우저가 스크롤을 먼저 처리할 수 있어 끊김이 줄어든다 */
    window.addEventListener('scroll', rafThrottle(syncFromScroll), { passive: true });

    /* 새로고침으로 페이지 중간에서 시작하는 경우를 위해 최초 1회 동기화 */
    syncFromScroll();
    render();
  };

  return { init };
})();
