---
title: إضافة ترجمة
description: دليل المساهمة للمترجمين.
priority: 98
---

## إعداد بيئة التطوير الخاصة بك

> إذا أردت يمكنك إجراء أي تغييرات مباشرةً عبر GitHub

1. انسخ مستودع (Fork) [موقع Rosé Pine](https://github.com/rose-pine/rose-pine-site) وشغّله محليًا.
2. قم بتثبيت [node](https://nodejs.org) و[pnpm](https://pnpm.io/installation).
3. داخل مجلد الموقع، ثبّت المتطلبات وشغّل خادم التطوير المحلي:
   ```sh
   pnpm install && pnpm dev
   ```
4. انتقل إلى:
   [http://localhost:3000](http://localhost:3000)
   لمشاهدة التحديثات بشكل مباشر.

### ترجمة التوثيق

1. أنشئ صفحة جديدة داخل `src/content/{locale}/`
2. استخدم النسخة الإنجليزية أو أي لغة أخرى كَمرجِع لك، مثل:
   `src/content/en/create-a-theme.md`

### ترجمة مقتطفات الصفحات

1.  أنشئ ملف لغة جديد داخل `src/locales/{locale}.json`
2. استخدم هيكل النسخة الإنجليزية أو أي لغة أخرى كَمرجِع لك، مثل : `src/locales/en.json`