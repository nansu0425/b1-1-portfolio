/**
 * reveal.js — 스크롤 등장 애니메이션
 *
 * IntersectionObserver 로 "요소가 화면에 threshold(0.2 = 20%) 만큼 들어왔는지"를 감시하고,
 * 들어온 순간 .is-visible 을 붙인 뒤 감시를 해제(unobserve)한다.
 * 해제하는 이유: 한 번 나타난 요소가 스크롤을 되돌릴 때마다 다시 사라지면 산만하고,
 * 관찰 대상이 줄어들어 성능에도 유리하기 때문이다.
 */
const Reveal = (() => {
  let observer = null;

  const showImmediately = (root = document) => {
    $$('.reveal', root).forEach((element) => {
      element.classList.add('is-visible');
    });
  };

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  };

  /** 나중에 만들어지는 요소(GitHub 카드 등)를 추가로 등록하기 위한 공개 함수 */
  const observe = (root = document) => {
    if (!observer) {
      showImmediately(root);
      return;
    }
    $$('.reveal', root).forEach((element) => {
      if (!element.classList.contains('is-visible')) {
        observer.observe(element);
      }
    });
  };

  const init = () => {
    /*
     * .reveal 의 "투명하게 숨김" 초기 스타일은 <html class="reveal-ready"> 가 있을 때만
     * 적용된다. JS 가 실행되지 않으면 이 클래스가 없으므로 내용이 그대로 보인다.
     */
    document.documentElement.classList.add('reveal-ready');

    const canObserve = 'IntersectionObserver' in window;

    if (!canObserve || prefersReducedMotion()) {
      showImmediately();
      return;
    }

    observer = new IntersectionObserver(handleIntersect, {
      threshold: APP_CONFIG.revealThreshold,
      rootMargin: '0px 0px -5% 0px'
    });

    observe();
  };

  return { init, observe };
})();
