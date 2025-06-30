---
title: 번역 추가하기
description: 번역 추가 가이드
priority: 98
---

## 개발 환경에 설치

> GitHub안에서 변경할 수 있습니다.

1. [Rosé Pine 웹사이트](https://github.com/rose-pine/rose-pine-site)를 fork한 후 clone합니다.
2. [node](https://nodejs.org)와 [pnpm](https://pnpm.io/installation)을 설치합니다.
3. 웹사이트의 디렉토리에서 의존성을 설치하고 로컬 개발 서버를 시작합니다:
   ```sh
   pnpm install && pnpm dev
   ```
4. 실시간으로 업데이트를 확인하기 위해 [http://localhost:3000](http://localhost:3000)으로 이동합니다.

### 문서 번역

1. `src/content/{locale}/` 위치에 새로운 페이지를 추가합니다.
2. 영어(e.g. `src/content/en/create-a-theme.md`) 또는 다른 언어의 페이지를 참고하여 번역합니다.

### 페이지 요소 번역

1. `src/locales/{locale}.json` 위치에 새로운 파일을 추가합니다.
2. 영어(e.g. `src/locales/en.json`) 또는 다른 언어의 스키마를 참고하여 번역합니다.
