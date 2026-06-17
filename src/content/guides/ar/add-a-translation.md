---
title: إضافة ترجمة
description: شرح تفصيلي لكيفية تدويل موقع روز باين.
author: ravenothere
publishedAt: 2026-06-18T12:00:00-06:00
updatedAt: 2026-06-18T12:00:00-06:00
---

اللغة جميلة، ونحن نُقدّر مشاركتك لغتك مع الآخرين! في الأسطر التالية سنتعرف على كيفية ترجمة أجزاء مختلفة من الموقع والمقالات.

على الرغم من أنه ليس ضروريًا تمامًا، فإن توفر بيئة تطوير محلية يتيح لك معاينة التغييرات مباشرة أثناء العمل. وكبديل عن ذلك، يمكنك [إجراء التعديلات مباشرة على GitHub](https://github.com/rose-pine/rose-pine-site).

## إعداد بيئة التطوير

1. قم بعمل Fork ثم Clone لـ [موقع روز باين](https://github.com/rose-pine/rose-pine-site).
2. قم بتثبيت [Node.js](https://nodejs.org/en/download) و[pnpm](https://pnpm.io/installation) باتباع الدليل الرسمي لكل منهما.
3. شغّل خادم التطوير عبر الأمر `pnpm dev` لمعاينة المحتوى مباشرة.

## ترجمة الموقع

انسخ ملف اللغة الإنجليزية وأعد تسميته برمز لغتك:

```diff
  src/i18n/locales/en.ts
+ src/i18n/locales/sd.ts
```

حدّث قيمة `name` داخل `config` باسم لغتك، ثم أضف ترجماتك:

```diff
  import { defineLocale } from "../define-locale";

  export default defineLocale({
    config: {
-     name: "English",
+     name: "Sindarin",
    },
    translations: {

  export default {
-   "shared.all": "All",
-   "shared.language": "Language",
+   "shared.all": "Pân",
+   "shared.language": "Lamb",
    ...
  }
```

أي ترجمة مفقودة ستعود تلقائيًا إلى الإنجليزية.

## ترجمة الأدلة الإرشادية

باستخدام النسخة الإنجليزية كمرجع، أنشئ دليلك:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

لاحظ إضافة مجلد `sd` في مثالنا للغة Sindarin، مع بقاء اسم الدليل كما هو.

حدّث الـ frontmatter — البيانات الوصفية الموجودة في أعلى الملف بين علامتي `---` — بإضافة العنوان والوصف والمؤلف والتواريخ.

```diff
  ---
  title: <title>
  description: <description>
  author: <username>
  publishedAt: 2025-11-09T12:00:00-06:00
  updatedAt: 2025-11-09T12:00:00-06:00
  ---
```

سيُطابَق اسم المستخدم الخاص بالمؤلف مع ملف داخل مجلد `src/content/authors/`، فتأكد من إضافة نفسك هناك، على سبيل المثال:

```diff
// src/content/authors/<username>.yml
+ name: "<name>"
+ image: "https://avatars.githubusercontent.com/<username>"
+ url: "https://example.com"
```

## أرسل تعديلاتك

أنشئ pull request على [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). سنراجعها ونعبّر عن تقديرنا لمساهمتك في جعل روز باين أكثر سهولة للجميع!
