/**
 * typing.js — Hero 문구 타이핑 효과 (미션 5. 보너스 과제)
 *
 * 원본 문구는 HTML 의 data-typing-text 에 들어 있고, JS 가 꺼져 있어도
 * 같은 문구가 그대로 보이도록 textContent 에도 미리 넣어 두었다.
 * 동작 줄이기(reduce motion) 설정이면 애니메이션 없이 즉시 완성 문구를 보여준다.
 */
const Typing = (() => {
  const state = {
    fullText: '',
    index: 0,
    isRunning: false
  };

  let element = null;
  let timerId = null;

  const render = () => {
    if (!element) {
      return;
    }
    element.textContent = state.fullText.slice(0, state.index);
    element.classList.toggle('is-typing', state.isRunning);
  };

  const step = () => {
    if (state.index >= state.fullText.length) {
      state.isRunning = false;
      render();
      return;
    }
    state.index += 1;
    render();
    timerId = window.setTimeout(step, APP_CONFIG.typing.speedMs);
  };

  const showFullText = () => {
    state.index = state.fullText.length;
    state.isRunning = false;
    render();
  };

  const init = () => {
    element = document.querySelector('#hero-typing');
    if (!element) {
      return;
    }

    state.fullText = element.dataset.typingText || element.textContent.trim();

    if (!APP_CONFIG.typing.enabled || prefersReducedMotion()) {
      showFullText();
      return;
    }

    state.index = 0;
    state.isRunning = true;
    render();
    timerId = window.setTimeout(step, APP_CONFIG.typing.startDelayMs);

    /* 다른 탭에 갔다 오면 타이핑을 기다리지 않고 바로 완성해 준다 */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state.isRunning) {
        window.clearTimeout(timerId);
        showFullText();
      }
    });
  };

  return { init };
})();
