# GitHub Pages 배포 절차 (B1-1)

> **이 문서는 "따라 할 절차"만 적어 둔 안내서입니다. 실제 배포는 아직 실행되지 않았습니다.**
> 커밋 · 푸시 · Pages 설정 · 평가 요청은 모두 사용자가 직접 수행합니다.

현재 상태
- 저장소: `~/codyssey/b1-1-portfolio` (git 초기화됨, **커밋 0개**, 브랜치 `master`)
- 코드 위치: **저장소 루트** (이 미션만 담는 독립 저장소입니다)
- 원격(remote) 미설정
- 저장소 루트 구성:
  - `README.md` — 저장소 첫 화면 안내 (채점자가 저장소 URL 로 들어왔을 때 처음 보는 화면)
  - `index.html` — 포트폴리오 메인 페이지. 저장소 루트가 곧 사이트 루트입니다.
  - `.nojekyll` — GitHub Pages 의 Jekyll 처리 비활성화. **게시 소스의 루트에 있어야 효과가 있는데,
    이 저장소는 루트가 곧 사이트 루트라 지금 위치가 정확합니다.**

---

## 0. 배포 전 확인

- [x] `js/config.js` 의 `APP_CONFIG.githubUsername` 을 **본인 GitHub ID** 로 교체했다. → **`nansu0425` 설정 완료**
      (값을 비워 두거나 `REPLACE_WITH_GITHUB_ID` 상태로 배포하면 Projects 섹션이 에러 상태로 "GitHub 계정 ID 가 아직 설정되지 않았습니다" 안내를 보여 줍니다.)
- [ ] `index.html` 안의 `TODO(user)` 주석 위치(이름 · 소개 · 기술 스택 · 이메일)를 본인 내용으로 채웠다.
- [ ] Live Server 로 열어 콘솔 에러가 없고, 다크 모드 · 햄버거 · 폼 · Projects 카드가 정상 동작한다.

```bash
# TODO(user) 로 표시된 곳을 한 번에 훑어보기
grep -rn "TODO(user)" ~/codyssey/b1-1-portfolio
```

---

## 1. 첫 커밋 만들기

```bash
cd ~/codyssey/b1-1-portfolio

git add .
git status          # 올라갈 파일 확인 (node_modules, .DS_Store 가 없어야 정상)
git commit -m "feat(b1-1): 나를 소개하는 반응형 포트폴리오 웹페이지 구현"
```

> GitHub Pages 의 기본 브랜치 이름은 `main` 이 관례입니다. 바꾸고 싶다면:
> ```bash
> git branch -M main
> ```
> 바꾸지 않고 `master` 를 그대로 써도 됩니다. **3번에서 고르는 브랜치 이름만 일치하면 됩니다.**

---

## 2. GitHub 저장소 만들고 연결하기

1. <https://github.com/new> 에서 새 저장소를 만듭니다.
   - Repository name: **`b1-1-portfolio`** 를 권장합니다 (로컬 폴더 이름과 같게 두면 문서의 주소가 그대로 맞습니다)
   - **Public** 으로 만듭니다. (무료 계정은 Private 저장소에 Pages 를 붙일 수 없습니다.)
   - README / .gitignore / license 는 **추가하지 않습니다.** (로컬에 이미 있어 충돌합니다.)
2. 만들어진 주소를 원격으로 등록하고 푸시합니다.

```bash
git remote add origin https://github.com/{GITHUB_ID}/{REPO_NAME}.git
git push -u origin master      # 1번에서 main 으로 바꿨다면 main
```

---

## 3. GitHub Pages 켜기

1. GitHub 저장소 페이지 → **Settings** 탭
2. 왼쪽 사이드바 → **Pages**
3. **Build and deployment** → **Source** 를 **`Deploy from a branch`** 로 선택
4. **Branch** 에서 방금 푸시한 브랜치(`master` 또는 `main`)와 **`/ (root)`** 를 고르고 **Save**
5. 1~3분 정도 기다리면 같은 화면 상단에 배포 주소가 표시됩니다.

제출용 접속 주소는 다음과 같습니다.

```text
https://{GITHUB_ID}.github.io/{REPO_NAME}/
```

> 권장 이름(`nansu0425` / `b1-1-portfolio`)을 그대로 썼다면 실제 주소는
> `https://nansu0425.github.io/b1-1-portfolio/` 입니다.
> 저장소 루트가 곧 사이트 루트라 **뒤에 하위 경로를 붙일 필요가 없습니다.**

---

## 4. 배포 URL 을 README 에 반영

자리표시 `{GITHUB_ID}` / `{REPO_NAME}` 가 있는 곳은 `README.md` 의 **1. 배포 URL** 표와
이 문서(`DEPLOY.md`)입니다. 실제 주소로 바꾸고 다시 푸시합니다.

```bash
# 남아 있는 자리표시 찾기
grep -rn "{GITHUB_ID}\|{REPO_NAME}" ~/codyssey/b1-1-portfolio --include="*.md"

git add README.md DEPLOY.md
git commit -m "docs(b1-1): 배포 URL 반영"
git push
```

---

## 5. 제출용 스크린샷 3장 찍기

배포된 주소를 **Chrome** 으로 열고 아래 3장을 찍어 `images/screenshots/` 에 저장합니다.
README 가 이미 이 파일명을 참조하고 있으므로 이름을 그대로 맞추면 자동으로 표시됩니다.

| 파일명 | 찍는 방법 |
|---|---|
| `desktop-light.png` | 일반 데스크톱 창(1280px 이상), 라이트 모드 |
| `mobile.png` | `F12` → 기기 도구 모음(`Ctrl/Cmd + Shift + M`) → iPhone 등 375px 폭. **햄버거 메뉴를 연 상태**가 보기 좋습니다. |
| `desktop-dark.png` | 데스크톱 폭에서 헤더의 테마 토글을 눌러 다크 모드로 전환한 화면 |

> macOS 전체 화면 캡처: `Cmd + Shift + 4` 후 영역 드래그 (또는 `Space` 를 눌러 창 단위 캡처)

```bash
git add images/screenshots
git commit -m "docs(b1-1): 데스크톱/모바일/다크모드 스크린샷 추가"
git push
```

---

## 6. Codyssey 평가 요청

미션 모달(<https://usr.codyssey.kr/learning/learningMap?projectNo=136003&openMission=1&lcorsNo=1122018&uqstnNo=185010>)에서
**평가 요청** 을 누르고 아래 세 가지를 제출합니다.

1. GitHub 저장소 URL — `https://github.com/{GITHUB_ID}/{REPO_NAME}`
2. 배포 사이트 URL — `https://{GITHUB_ID}.github.io/{REPO_NAME}/`
3. 스크린샷 3종 (데스크톱 · 모바일 · 다크 모드)

---

## 부록 A. 저장소 루트 구성 (이미 적용됨)

제출물이 **저장소 URL** 이라 채점자가 가장 먼저 보는 화면은 GitHub 저장소 첫 페이지입니다.
이 미션은 독립 저장소를 쓰므로, 루트에 아래 파일들이 그대로 놓여 있습니다.

| 파일 | 역할 |
|---|---|
| `README.md` | 저장소 첫 화면 안내. 프로젝트 설명 · 사용 기술 · 스크린샷 · 과제 목표 자문자답 |
| `index.html` | 포트폴리오 메인 페이지. 저장소 루트가 곧 사이트 루트라 별도 리다이렉션이 필요 없음 |
| `.nojekyll` | Jekyll 처리 비활성화. **Pages 는 게시 소스 루트의 `.nojekyll` 만 인식**하므로 루트에 둔다 |
| `MISSION.md` | 미션 원문 사본 (원본 보존) |

> 예전에는 여러 미션을 한 저장소에 모아 두고 미션마다 폴더 하나를 썼기 때문에,
> 루트에 목차 `README.md` 와 미션 폴더로 보내는 리다이렉션 `index.html` 이 따로 필요했습니다.
> 미션별 독립 저장소로 분리하면서 **그 두 파일은 더 이상 필요하지 않게 되어** 이 저장소에는 없습니다.
> 덕분에 제출 주소도 하위 경로 없이 `https://{GITHUB_ID}.github.io/{REPO_NAME}/` 로 짧아졌습니다.

---

## 부록 B. 문제가 생겼을 때

| 증상 | 원인 / 해결 |
|---|---|
| 배포 주소가 404 | ① Pages 설정 저장 후 1~3분 대기 ② 주소가 `https://{GITHUB_ID}.github.io/{REPO_NAME}/` 형태인지(하위 경로를 덧붙이지 않았는지) 확인 ③ Settings → Pages 에서 브랜치가 실제 푸시한 브랜치와 같은지 확인 |
| 페이지는 뜨는데 스타일이 없음 | 자산 경로가 절대경로(`/css/...`)로 바뀌지 않았는지 확인. 이 프로젝트는 전부 `./css/...` 상대경로여야 정상 |
| Projects 에 "GitHub 계정 ID 가 아직 설정되지 않았습니다" 안내 | `js/config.js` 의 `githubUsername` 이 아직 `REPLACE_WITH_GITHUB_ID` 입니다 |
| Projects 에 "사용자를 찾지 못했습니다" (404) | `githubUsername` 오타 확인 |
| Projects 에 "요청 한도를 넘었습니다" (403) | 비로그인 GitHub API 는 시간당 60회 제한입니다. 잠시 후 재시도하거나 `config.js` 의 `cacheMinutes` 를 `10` 으로 설정 |
| 수정했는데 반영이 안 됨 | GitHub Pages 캐시입니다. `Cmd/Ctrl + Shift + R` 강력 새로고침, 또는 Actions 탭에서 `pages build and deployment` 완료 여부 확인 |
| 폴더/파일이 안 올라감 | `.gitignore` 확인. `images/screenshots/` 는 비어 있으면 git 이 무시하므로 `.gitkeep` 을 넣어 두었습니다 |
| `_` 로 시작하는 파일/폴더가 배포에서 사라짐 | Jekyll 이 건너뛴 것입니다. 저장소 **루트**에 `.nojekyll` 이 있는지 확인하세요(`ls -a` 로 보입니다). 이 프로젝트에는 `_` 로 시작하는 경로가 없어 현재는 해당 없음 |
