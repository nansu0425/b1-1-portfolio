/**
 * projects.js — GitHub API 연동 (이 미션의 핵심)
 *
 * [상태 → 렌더링 흐름 #2]
 *   API 호출 시작 → state.status = 'loading'  → render() → 스피너
 *   응답 성공     → state.status = 'success'  → render() → 카드 그리드
 *   저장소 0개    → state.status = 'empty'    → render() → "표시할 프로젝트가 없습니다."
 *   실패          → state.status = 'error'    → render() → 에러 메시지 + [다시 시도]
 *
 * [상태 → 렌더링 흐름 #5 · 보너스]
 *   언어 필터 버튼 클릭 → state.filter 변경 → render() → 카드 목록이 바뀐다
 *
 * 규칙: 이벤트 핸들러는 절대 DOM 을 직접 고치지 않는다. setState() 로 상태만 바꾸고,
 *       화면을 만드는 일은 오직 render() 하나가 담당한다. (React 의 상태-렌더링 흐름과 같은 구조)
 */
const Projects = (() => {
  /** 이 모듈의 유일한 상태 */
  const state = {
    status: 'idle',  // 'idle' | 'loading' | 'success' | 'empty' | 'error'
    repos: [],       // 화면에 쓸 저장소 목록
    filter: 'all',   // 'all' | 언어 이름
    error: null      // { title, message, canRetry }
  };

  let statusElement = null;
  let gridElement = null;
  let filterElement = null;

  /* ------------------------------------------------------------------ *
   * 상태 변경
   * ------------------------------------------------------------------ */
  const setState = (patch) => {
    Object.assign(state, patch);
    render();
  };

  /* ------------------------------------------------------------------ *
   * 파생 데이터 (상태에서 계산해 낸다 — 따로 저장하지 않는다)
   * ------------------------------------------------------------------ */

  /** 현재 필터를 적용한 저장소 목록 */
  const getVisibleRepos = () => {
    if (state.filter === 'all') {
      return state.repos;
    }
    return state.repos.filter((repo) => repo.language === state.filter);
  };

  /** 카드에 등장하는 언어 목록 (중복 제거 + 가나다/알파벳순) */
  const getLanguages = () =>
    Array.from(
      new Set(state.repos.map((repo) => repo.language).filter((language) => Boolean(language)))
    ).sort();

  /* ------------------------------------------------------------------ *
   * 렌더링 — 상태별 마크업을 만드는 순수 함수들
   * ------------------------------------------------------------------ */

  const renderLoadingHtml = () => `
    <div class="state state--loading">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state__title">프로젝트를 불러오는 중...</p>
      <p class="state__desc">GitHub API 에서 저장소 목록을 가져오고 있습니다.</p>
    </div>
  `;

  const renderErrorHtml = () => {
    const { title, message, canRetry } = state.error || {};
    const retryButton = canRetry === false
      ? ''
      : '<button class="btn btn--primary btn--small" type="button" data-action="retry">다시 시도</button>';

    return `
      <div class="state state--error">
        <svg class="state__icon" aria-hidden="true" focusable="false"><use href="#icon-alert"></use></svg>
        <p class="state__title">${escapeHtml(title || '프로젝트를 불러올 수 없습니다')}</p>
        <p class="state__desc">${escapeHtml(message || '')}</p>
        ${retryButton}
      </div>
    `;
  };

  const renderEmptyHtml = () => `
    <div class="state state--empty">
      <svg class="state__icon" aria-hidden="true" focusable="false"><use href="#icon-inbox"></use></svg>
      <p class="state__title">표시할 프로젝트가 없습니다.</p>
      <p class="state__desc">조건에 맞는 공개 저장소가 없습니다. 필터를 바꾸거나 GitHub 에 저장소를 추가해 보세요.</p>
    </div>
  `;

  /** 저장소 하나 → 카드 하나 (구조분해 할당 + 템플릿 리터럴) */
  const createCardHtml = (repo) => {
    const {
      name,
      description,
      html_url: htmlUrl,
      stargazers_count: stars,
      forks_count: forks,
      language,
      updated_at: updatedAt,
      topics
    } = repo;

    const topicList = Array.isArray(topics) ? topics.slice(0, 3) : [];
    const topicsHtml = topicList
      .map((topic) => `<li class="card__topic">#${escapeHtml(topic)}</li>`)
      .join('');

    const languageHtml = language
      ? `<span class="card__meta-item"><span class="card__lang-dot" aria-hidden="true"></span>${escapeHtml(language)}</span>`
      : '';

    return `
      <article class="card reveal">
        <h3 class="card__title">
          <a class="card__link" href="${escapeHtml(htmlUrl)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(name)}
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-link"></use></svg>
            <span class="sr-only">(새 창에서 열림)</span>
          </a>
        </h3>
        <p class="card__desc">${escapeHtml(description || '설명이 등록되지 않은 저장소입니다.')}</p>
        ${topicsHtml ? `<ul class="card__topics">${topicsHtml}</ul>` : ''}
        <p class="card__meta">
          ${languageHtml}
          <span class="card__meta-item">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-star"></use></svg>
            ${Number(stars) || 0}
            <span class="sr-only">스타</span>
          </span>
          <span class="card__meta-item">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-fork"></use></svg>
            ${Number(forks) || 0}
            <span class="sr-only">포크</span>
          </span>
          <span class="card__meta-item">업데이트 ${escapeHtml(formatDate(updatedAt))}</span>
        </p>
      </article>
    `;
  };

  /** 언어 필터 버튼 (보너스 과제) */
  const renderFilter = () => {
    if (!filterElement) {
      return;
    }

    if (state.status !== 'success') {
      filterElement.innerHTML = '';
      delete filterElement.dataset.signature;
      return;
    }

    const languages = getLanguages();
    if (languages.length < 2) {
      filterElement.innerHTML = '';
      delete filterElement.dataset.signature;
      return;
    }

    const options = ['all'].concat(languages);
    const signature = options.join('|');

    /*
     * 언어 목록 자체가 그대로라면 버튼을 다시 만들지 않고 aria-pressed 만 바꾼다.
     * 필터를 누를 때마다 innerHTML 로 통째로 갈아끼우면 방금 누른 버튼이 사라져
     * 키보드 포커스를 잃기 때문이다. (상태가 바뀌어도 DOM 은 최소한만 건드린다)
     */
    if (filterElement.dataset.signature === signature) {
      $$('[data-filter]', filterElement).forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter));
      });
      return;
    }

    const buttons = options.map((language) => {
      const label = language === 'all' ? '전체' : language;
      const pressed = state.filter === language;
      return `
        <button class="filter-btn" type="button" data-filter="${escapeHtml(language)}" aria-pressed="${pressed}">
          ${escapeHtml(label)}
        </button>
      `;
    });

    filterElement.innerHTML = buttons.join('');
    filterElement.dataset.signature = signature;
  };

  /** 상태를 화면에 반영하는 단 하나의 함수 */
  function render() {
    if (!statusElement || !gridElement) {
      return;
    }

    renderFilter();

    if (state.status === 'loading') {
      gridElement.innerHTML = '';
      statusElement.innerHTML = renderLoadingHtml();
      return;
    }

    if (state.status === 'error') {
      gridElement.innerHTML = '';
      statusElement.innerHTML = renderErrorHtml();
      return;
    }

    if (state.status === 'empty') {
      gridElement.innerHTML = '';
      statusElement.innerHTML = renderEmptyHtml();
      return;
    }

    if (state.status === 'success') {
      const visibleRepos = getVisibleRepos();

      if (visibleRepos.length === 0) {
        gridElement.innerHTML = '';
        statusElement.innerHTML = renderEmptyHtml();
        return;
      }

      statusElement.innerHTML = '';
      gridElement.innerHTML = visibleRepos.map(createCardHtml).join('');

      /* 새로 만들어진 카드도 스크롤 등장 애니메이션 대상으로 등록한다 */
      Reveal.observe(gridElement);
      return;
    }

    /* idle */
    statusElement.innerHTML = '';
    gridElement.innerHTML = '';
  }

  /* ------------------------------------------------------------------ *
   * 데이터 가져오기
   * ------------------------------------------------------------------ */

  /** 응답 상태 코드별로 사용자에게 보여줄 문구를 정한다. */
  const describeHttpError = (response) => {
    const remaining = response.headers.get('X-RateLimit-Remaining');

    if (response.status === 404) {
      return {
        title: '프로젝트를 불러올 수 없습니다',
        message: `GitHub 사용자 '${APP_CONFIG.githubUsername}' 를 찾지 못했습니다. js/config.js 의 githubUsername 값을 확인해 주세요.`,
        canRetry: true
      };
    }

    if (response.status === 403 && remaining === '0') {
      return {
        title: '프로젝트를 불러올 수 없습니다',
        message: 'GitHub API 요청 한도(비로그인 기준 시간당 60회)를 넘었습니다. 잠시 후 다시 시도해 주세요.',
        canRetry: true
      };
    }

    return {
      title: '프로젝트를 불러올 수 없습니다',
      message: `GitHub API 가 ${response.status} 응답을 보냈습니다. 잠시 후 다시 시도해 주세요.`,
      canRetry: true
    };
  };

  /** 선택 기능: cacheMinutes 가 0 보다 클 때만 동작하는 sessionStorage 캐시 */
  const readCache = () => {
    if (!APP_CONFIG.cacheMinutes) {
      return null;
    }
    try {
      const raw = window.sessionStorage.getItem(APP_CONFIG.storageKeys.reposCache);
      if (!raw) {
        return null;
      }
      const { savedAt, username, repos } = JSON.parse(raw);
      const isFresh = Date.now() - savedAt < APP_CONFIG.cacheMinutes * 60 * 1000;
      return isFresh && username === APP_CONFIG.githubUsername ? repos : null;
    } catch (error) {
      return null;
    }
  };

  const writeCache = (repos) => {
    if (!APP_CONFIG.cacheMinutes) {
      return;
    }
    try {
      const payload = JSON.stringify({
        savedAt: Date.now(),
        username: APP_CONFIG.githubUsername,
        repos
      });
      window.sessionStorage.setItem(APP_CONFIG.storageKeys.reposCache, payload);
    } catch (error) {
      /* 캐시는 부가 기능이므로 실패해도 무시한다 */
    }
  };

  /**
   * 미션 요구사항에 맞춰 fork / archived 저장소를 걸러낸다.
   * maxVisibleRepos 는 0(기본)이면 자르지 않는다 — 미션이 "저장소 목록을 가져와 표시"만
   * 요구하고 개수를 정하지 않으므로, 임의로 잘라 사용자의 저장소가 빠지는 일이 없게 한다.
   */
  const selectRepos = (repos) => {
    const selected = repos
      .filter((repo) => (APP_CONFIG.excludeForks ? !repo.fork : true))
      .filter((repo) => (APP_CONFIG.excludeArchived ? !repo.archived : true));

    return APP_CONFIG.maxVisibleRepos > 0
      ? selected.slice(0, APP_CONFIG.maxVisibleRepos)
      : selected;
  };

  /** fetch + async/await + try/catch */
  const loadProjects = async () => {
    if (!isGithubUsernameConfigured()) {
      setState({
        status: 'error',
        repos: [],
        error: {
          title: '프로젝트를 불러올 수 없습니다',
          message: "GitHub 계정 ID 가 아직 설정되지 않았습니다. js/config.js 를 열고 APP_CONFIG.githubUsername 의 'REPLACE_WITH_GITHUB_ID' 를 본인 GitHub ID 로 바꿔 주세요.",
          canRetry: true
        }
      });
      return;
    }

    setState({ status: 'loading', error: null });

    const cached = readCache();
    if (cached) {
      setState({ status: cached.length > 0 ? 'success' : 'empty', repos: cached, filter: 'all' });
      return;
    }

    try {
      const response = await fetch(buildReposUrl(), {
        headers: { Accept: 'application/vnd.github+json' }
      });

      if (!response.ok) {
        throw Object.assign(new Error(`HTTP ${response.status}`), {
          details: describeHttpError(response)
        });
      }

      const data = await response.json();
      const repos = selectRepos(Array.isArray(data) ? data : []);
      writeCache(repos);

      setState({
        status: repos.length > 0 ? 'success' : 'empty',
        repos,
        filter: 'all',
        error: null
      });
    } catch (error) {
      const details = error.details || {
        title: '프로젝트를 불러올 수 없습니다',
        message: '네트워크 연결을 확인한 뒤 다시 시도해 주세요.',
        canRetry: true
      };
      setState({ status: 'error', repos: [], error: details });
    }
  };

  /* ------------------------------------------------------------------ *
   * 이벤트 — 다시 그려도 사라지지 않도록 "컨테이너에 위임"한다
   * ------------------------------------------------------------------ */
  const handleStatusClick = (event) => {
    const retryButton = event.target.closest('[data-action="retry"]');
    if (!retryButton) {
      return;
    }
    loadProjects();
  };

  const handleFilterClick = (event) => {
    const filterButton = event.target.closest('[data-filter]');
    if (!filterButton) {
      return;
    }
    setState({ filter: filterButton.dataset.filter });
  };

  const init = () => {
    statusElement = document.querySelector('#projects-status');
    gridElement = document.querySelector('#projects-grid');
    filterElement = document.querySelector('#projects-filter');

    if (statusElement) {
      statusElement.addEventListener('click', handleStatusClick);
    }
    if (filterElement) {
      filterElement.addEventListener('click', handleFilterClick);
    }

    loadProjects();
  };

  /* 다시 불러오기는 [다시 시도] 버튼(이벤트 위임)이 담당한다. 외부 공개 API 는 init 뿐이다. */
  return { init };
})();
