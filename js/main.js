const GITHUB_USERNAME = 'nansu0425';
const HEADER_SCROLL_THRESHOLD = 60;
const SCROLL_TOP_THRESHOLD = 300;
const REVEAL_THRESHOLD = 0.2;

/* ---------- 다크 모드: 클릭 → theme 상태 변경 → data-theme 갱신 ---------- */
const themeToggle = document.querySelector('#theme-toggle');
let theme = localStorage.getItem('theme') || 'light';

const renderTheme = () => {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
};

themeToggle.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  renderTheme();
});

renderTheme();

/* ---------- 햄버거 메뉴 ---------- */
const navToggle = document.querySelector('#nav-toggle');
const navMenu = document.querySelector('#nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('#nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

/* ---------- 스크롤: 헤더 배경 변경 + 스크롤 탑 버튼 ---------- */
const header = document.querySelector('.header');
const scrollTopButton = document.querySelector('#scroll-top');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > HEADER_SCROLL_THRESHOLD);
  scrollTopButton.classList.toggle('visible', window.scrollY > SCROLL_TOP_THRESHOLD);
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- 스크롤 애니메이션 ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      target.classList.add('visible');
      observer.unobserve(target);
    }
  });
}, { threshold: REVEAL_THRESHOLD });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

/* ---------- Projects: API 호출 → loading/success/empty/error 상태 → 렌더링 ---------- */
const projectsStatus = document.querySelector('#projects-status');
const projectsGrid = document.querySelector('#projects-grid');

const createCard = ({ name, description, html_url, language, stargazers_count }) => `
  <article class="card">
    <h3><a href="${html_url}" target="_blank" rel="noopener">${name}</a></h3>
    <p>${description || '설명이 없습니다.'}</p>
    <p>${language || '-'} · ★ ${stargazers_count}</p>
  </article>
`;

const renderProjects = (status, repos = []) => {
  projectsGrid.innerHTML = '';

  if (status === 'loading') {
    projectsStatus.innerHTML = '<p>로딩 중...</p>';
  } else if (status === 'error') {
    projectsStatus.innerHTML = `
      <p>프로젝트를 불러올 수 없습니다.</p>
      <button class="btn" id="retry" type="button">다시 시도</button>
    `;
    document.querySelector('#retry').addEventListener('click', loadProjects);
  } else if (status === 'empty') {
    projectsStatus.innerHTML = '<p>표시할 프로젝트가 없습니다.</p>';
  } else {
    projectsStatus.innerHTML = '';
    projectsGrid.innerHTML = repos.map(createCard).join('');
  }
};

const loadProjects = async () => {
  renderProjects('loading');

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    // 레이트 리밋(403) 등 실패 응답도 에러 상태로 보낸다
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const repos = data.filter((repo) => !repo.fork);
    renderProjects(repos.length > 0 ? 'success' : 'empty', repos);
  } catch (error) {
    renderProjects('error');
  }
};

loadProjects();

/* ---------- Contact 폼: 입력/제출 → 유효성 검사 → 에러 메시지 표시/숨김 ---------- */
const form = document.querySelector('#contact-form');
const formSuccess = document.querySelector('#form-success');
const fields = form.querySelectorAll('input, textarea');
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, value }) => {
  if (value.trim() === '') {
    return '필수 입력 항목입니다.';
  }
  if (name === 'email' && !EMAIL_PATTERN.test(value)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return '';
};

const renderError = (field, message) => {
  document.querySelector(`#${field.id}-error`).textContent = message;
  field.classList.toggle('invalid', message !== '');
};

form.addEventListener('input', (event) => {
  renderError(event.target, validate(event.target));
  formSuccess.textContent = '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;
  fields.forEach((field) => {
    const message = validate(field);
    renderError(field, message);
    if (message) {
      isValid = false;
    }
  });

  if (isValid) {
    formSuccess.textContent = '메시지가 전송되었습니다. 감사합니다!';
    form.reset();
  }
});
