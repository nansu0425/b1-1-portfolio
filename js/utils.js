/**
 * utils.js — 여러 모듈이 함께 쓰는 아주 작은 도우미 함수 모음.
 * 라이브러리를 쓰지 않으므로 필요한 것만 직접 만든다.
 */

/*
 * 요소 1개를 고를 때는 각 모듈이 document.querySelector() 를 그대로 호출한다.
 * 단축 별칭($)을 두었다가 실제로 쓰는 곳이 한 곳도 없어 지웠다.
 * 반면 querySelectorAll 은 NodeList(= map/filter 가 없는 유사 배열)를 돌려주므로
 * 배열로 바꾸는 아래 도우미가 실제로 쓸모가 있어 남겨 둔다.
 */

/** querySelectorAll 단축 — NodeList 를 배열로 바꿔 map/filter/forEach 를 바로 쓴다 */
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/**
 * innerHTML 로 원격 데이터를 넣기 전에 반드시 통과시킨다.
 * GitHub 저장소 이름·설명은 남이 만든 문자열이므로 그대로 넣으면 XSS 위험이 있다.
 */
const escapeHtml = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * 스크롤처럼 초당 수십 번 발생하는 이벤트를 화면 주사율에 맞춰 1회로 묶는다.
 * (requestAnimationFrame 기반 스로틀)
 */
const rafThrottle = (callback) => {
  let ticking = false;
  return (...args) => {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      callback(...args);
    });
  };
};

/** OS 의 "동작 줄이기(reduce motion)" 설정 여부 */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 부드러운 스크롤 동작값 — 모션 최소화 설정이면 즉시 이동 */
const scrollBehavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');

/** 2026-09-16 형태의 날짜 문자열 (Intl 없이도 안전하게) */
const formatDate = (isoString) => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
