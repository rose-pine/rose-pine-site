---
title: 번역 추가하기
description: Rosé Pine 웹사이트 다국어 번역을 위한 안내 가이드.
author: Taeyoon Kim
publishedAt: 2025-11-09T12:00:00-06:00
updatedAt: 2025-11-09T12:00:00-06:00
---

언어는 아름다우며 여러분의 언어를 다른 사람들과 공유해 주셔서 진심으로 감사드립니다! 아래에서는 웹사이트와 문서의 다양한 부분을 번역하는 방법을 안내합니다.

반드시 필요한 것은 아니지만 로컬 개발 환경을 설정하면 변경사항을 실시간으로 미리 볼 수 있습니다. 또는 [GitHub에서 직접 수정](https://github.com/rose-pine/rose-pine-site)할 수도 있습니다.

## 개발 환경 설정하기

1. [Rosé Pine 웹사이트](https://github.com/rose-pine/rose-pine-site)를 포크(fork)하고 복제(clone)합니다.
2. 공식 가이드를 참조하여 [Node.js](https://nodejs.org/en/download)와 [pnpm](https://pnpm.io/installation)을 설치합니다.
3. `pnpm dev` 명령어로 개발 서버를 실행하여 콘텐츠를 실시간으로 미리 봅니다.

## 웹사이트 번역하기

영어 로케일 파일을 복사하여 여러분의 언어 코드로 이름을 변경합니다:

```diff
  src/locales/en.ts
+ src/locales/sd.ts
```

`config` 내부의 `name`을 해당 언어의 이름으로 변경한 후 번역 내용을 추가합니다:

```diff
  import { defineLocale } from "../utilities/i18n";

  export default defineLocale({
    config: {
-     name: "English",
+     name: "Sindarin",
    },
    translations: {
-     "nav.language": "Language",
+     "nav.language": "Lamb",
      ...
    },
  });
```

누락된 번역 항목은 자동으로 영어로 대체(fallback)됩니다.

## 가이드 번역하기

영어 버전을 참고하여 가이드 문서를 작성합니다:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

예시인 신다린(Sindarin)의 경우 `sd` 폴더가 추가되었으며, 가이드 파일 이름은 동일하게 유지됩니다.

파일 상단의 `---` 구분자로 둘러싸인 프론트매터(메타데이터)를 제목(title), 설명(description), 작성자(author) 및 날짜(publishedAt, updatedAt)로 업데이트합니다.

```
---
title: <title>
description: <description>
author: <username>
publishedAt: 2025-11-09T12:00:00-06:00
updatedAt: 2025-11-09T12:00:00-06:00
---
```

작성자의 사용자 이름(username)은 `src/content/authors/` 폴더 내의 파일과 매칭되므로 해당 위치에 작성자 정보를 추가해 주세요:

```diff
// src/content/authors/<username>.yaml
+ name: "<name>"
+ image: "https://avatars.githubusercontent.com/<username>"
+ url: "https://example.com"
```

## 변경사항 제출하기

[rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site)에 풀 리퀘스트(Pull Request)를 생성합니다. 변경사항을 검토한 후 Rosé Pine의 접근성을 높여주신 것에 대해 감사의 인사를 전해 드리겠습니다!
