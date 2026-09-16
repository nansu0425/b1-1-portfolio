/**
 * theme.js — 다크 모드
 *
 * [상태 → 렌더링 흐름 #1]
 *   사용자가 토글 버튼 클릭
 *     → 상태(state.theme)가 'light' / 'dark' 로 바뀐다
 *       → render() 가 <html data-theme> 를 갱신한다
 *         → CSS 변수가 통째로 교체되어 화면 전체 색이 바뀐다
 *
 * 선택한 테마는 localStorage 에 저장되어 새로고침 후에도 유지된다.
 */
const Theme = (() => {
  const STORAGE_KEY = APP_CONFIG.storageKeys.theme;

  /* 이 모듈이 가진 유일한 상태 */
  const state = {
    theme: 'light',      // 'light' | 'dark'
    isUserChoice: false  // 사용자가 직접 고른 값인지(= localStorage 에 저장된 값인지)
  };

  let toggleButton = null;
  let systemDarkQuery = null;
  let colorSchemeMeta = null;

  /** localStorage 는 브라우저 설정에 따라 접근이 막힐 수 있으므로 감싼다. */
  const readStoredTheme = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const writeStoredTheme = (theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* 시크릿 모드 등에서 저장이 막혀도 화면 동작은 계속되어야 한다 */
    }
  };

  /** 초기값 우선순위: 저장된 값 > 시스템(OS) 설정 > light */
  const getInitialTheme = () => {
    const stored = readStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      state.isUserChoice = true;
      return stored;
    }
    return systemDarkQuery && systemDarkQuery.matches ? 'dark' : 'light';
  };

  /** 상태를 화면에 반영하는 단 하나의 함수 */
  const render = () => {
    const isDark = state.theme === 'dark';

    document.documentElement.dataset.theme = state.theme;

    /*
     * 스크롤바·기본 폼 컨트롤처럼 브라우저가 직접 그리는 부분은 CSS 변수가 아니라
     * color-scheme 값을 따른다. HTML 의 초기값은 'light dark'(= OS 설정에 맡김)라서
     * 사용자가 OS 와 반대되는 테마를 고르면 그 부분만 어긋난다. 그래서 여기서 함께 갱신한다.
     */
    if (colorSchemeMeta) {
      colorSchemeMeta.setAttribute('content', state.theme);
    }

    if (toggleButton) {
      toggleButton.setAttribute('aria-pressed', String(isDark));
      toggleButton.setAttribute('aria-label', isDark ? '라이트 모드 켜기' : '다크 모드 켜기');
      toggleButton.title = isDark ? '라이트 모드로 전환' : '다크 모드로 전환';
    }
  };

  /** 상태 변경 진입점 — 핸들러는 DOM 을 직접 만지지 않고 이 함수만 호출한다 */
  const setTheme = (theme, options = {}) => {
    const { persist = true } = options;
    state.theme = theme === 'dark' ? 'dark' : 'light';
    if (persist) {
      state.isUserChoice = true;
      writeStoredTheme(state.theme);
    }
    render();
  };

  const handleToggleClick = () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  };

  /** 저장된 값이 없을 때만 OS 설정 변화를 따라간다 */
  const handleSystemChange = (event) => {
    if (state.isUserChoice) {
      return;
    }
    setTheme(event.matches ? 'dark' : 'light', { persist: false });
  };

  const init = () => {
    toggleButton = document.querySelector('#theme-toggle');
    colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
    systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    state.theme = getInitialTheme();
    render();

    if (toggleButton) {
      toggleButton.addEventListener('click', handleToggleClick);
    }
    systemDarkQuery.addEventListener('change', handleSystemChange);
  };

  /* 다른 모듈은 init() 만 호출한다. 외부에서 쓰이지 않는 setTheme/getTheme 은 공개하지 않는다. */
  return { init };
})();
