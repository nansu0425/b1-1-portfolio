/**
 * form.js — Contact 폼 유효성 검사
 *
 * [상태 → 렌더링 흐름 #3]
 *   입력(input) 또는 제출(submit)
 *     → state.errors / state.touched 가 바뀐다
 *       → render() 가 필드 아래 에러 메시지와 aria-invalid 를 갱신한다
 *
 * 폼에는 novalidate 를 붙여 브라우저 기본 말풍선 대신 항상 우리 UI 가 보이게 했다.
 */
const ContactForm = (() => {
  /*
   * 이메일 정규식은 RFC 5322 를 완전히 구현하지 않는다.
   * 실무에서 쓰이는 관용 패턴("@ 앞뒤에 공백 없는 문자, 점 뒤 2자 이상")으로 충분하며,
   * 최종 확인은 결국 서버/메일 발송이 하기 때문이다.
   */
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const MIN_NAME_LENGTH = 2;
  const MIN_MESSAGE_LENGTH = 10;

  /** 필드 이름 → 검증 함수. 통과하면 '' (빈 문자열), 실패하면 에러 메시지를 돌려준다. */
  const validators = {
    name: (value) => {
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        return '이름을 입력해 주세요.';
      }
      if (trimmed.length < MIN_NAME_LENGTH) {
        return `이름을 ${MIN_NAME_LENGTH}자 이상 입력해 주세요.`;
      }
      return '';
    },
    email: (value) => {
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        return '이메일을 입력해 주세요.';
      }
      if (!EMAIL_PATTERN.test(trimmed)) {
        return '올바른 이메일 형식이 아닙니다. (예: you@example.com)';
      }
      return '';
    },
    message: (value) => {
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        return '문의 내용을 입력해 주세요.';
      }
      if (trimmed.length < MIN_MESSAGE_LENGTH) {
        return `문의 내용을 ${MIN_MESSAGE_LENGTH}자 이상 입력해 주세요. (현재 ${trimmed.length}자)`;
      }
      return '';
    }
  };

  const FIELD_NAMES = Object.keys(validators);

  /** 이 모듈의 유일한 상태 */
  const state = {
    errors: { name: '', email: '', message: '' },
    touched: { name: false, email: false, message: false },
    successMessage: ''
  };

  let formElement = null;
  let successElement = null;
  const inputs = {};
  const errorNodes = {};

  /** 상태를 화면에 반영하는 단 하나의 함수 */
  const render = () => {
    FIELD_NAMES.forEach((fieldName) => {
      const input = inputs[fieldName];
      const errorNode = errorNodes[fieldName];
      if (!input || !errorNode) {
        return;
      }

      const message = state.touched[fieldName] ? state.errors[fieldName] : '';

      errorNode.textContent = message;

      if (message) {
        input.setAttribute('aria-invalid', 'true');
        input.classList.add('is-invalid');
      } else {
        input.removeAttribute('aria-invalid');
        input.classList.remove('is-invalid');
      }
    });

    if (successElement) {
      successElement.textContent = state.successMessage;
    }
  };

  const setState = (patch) => {
    Object.assign(state, patch);
    render();
  };

  /** 필드 하나를 검사해 상태에 반영한다. */
  const validateField = (fieldName, options = {}) => {
    const { markTouched = true } = options;
    const input = inputs[fieldName];
    if (!input) {
      return true;
    }

    const message = validators[fieldName](input.value);

    state.errors[fieldName] = message;
    if (markTouched) {
      state.touched[fieldName] = true;
    }

    return message === '';
  };

  /** 모든 필드를 검사한다. 통과하면 true. */
  const validateAll = () => {
    /* forEach 로 순회하며 전부 검사한다 (일찍 멈추지 않고 모든 오류를 한 번에 보여주기 위해) */
    FIELD_NAMES.forEach((fieldName) => validateField(fieldName));
    return FIELD_NAMES.every((fieldName) => state.errors[fieldName] === '');
  };

  /** 이미 한 번 검사된 필드만 실시간으로 다시 검사한다 (입력 도중 잔소리 방지) */
  const handleInput = (event) => {
    const fieldName = event.target.name;
    if (!validators[fieldName] || !state.touched[fieldName]) {
      return;
    }
    validateField(fieldName);
    setState({ successMessage: '' });
  };

  /** 포커스를 벗어나는 순간 처음 검사한다 */
  const handleBlur = (event) => {
    const fieldName = event.target.name;
    if (!validators[fieldName]) {
      return;
    }
    validateField(fieldName);
    render();
  };

  const handleSubmit = (event) => {
    /* 미션 요구사항: 기본 제출(페이지 새로고침)을 막는다 */
    event.preventDefault();

    const isValid = validateAll();

    if (!isValid) {
      setState({ successMessage: '' });
      /* 첫 번째 오류 필드로 포커스를 옮겨 준다 */
      const firstInvalid = FIELD_NAMES.find((fieldName) => state.errors[fieldName] !== '');
      if (firstInvalid && inputs[firstInvalid]) {
        inputs[firstInvalid].focus();
      }
      return;
    }

    /* 백엔드가 없으므로 실제 전송 대신 성공 상태만 표시한다 */
    const { value: name } = inputs.name;
    formElement.reset();

    FIELD_NAMES.forEach((fieldName) => {
      state.errors[fieldName] = '';
      state.touched[fieldName] = false;
    });

    setState({
      successMessage: `${name.trim()}님, 메시지가 정상적으로 확인되었습니다. 감사합니다!`
    });
  };

  const init = () => {
    formElement = document.querySelector('#contact-form');
    if (!formElement) {
      return;
    }

    successElement = document.querySelector('#form-success');

    FIELD_NAMES.forEach((fieldName) => {
      inputs[fieldName] = formElement.querySelector(`[name="${fieldName}"]`);
      errorNodes[fieldName] = document.querySelector(`#contact-${fieldName}-error`);
    });

    formElement.addEventListener('submit', handleSubmit);
    formElement.addEventListener('input', handleInput);

    FIELD_NAMES.forEach((fieldName) => {
      const input = inputs[fieldName];
      if (input) {
        input.addEventListener('blur', handleBlur);
      }
    });

    render();
  };

  return { init };
})();
