---
title: Menambah terjemahan
description: Petunjuk penerjemah untuk berkontribusi.
priority: 98
---

## Siapkan lingkungan pengembangan Anda

> Jangan ragu untuk membuat perubahan apa pun secara langsung di GitHub

1. Fork dan clone [website Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Install [node](https://nodejs.org) dan [pnpm](https://pnpm.io/installation).
3. Saat berada di dalam direktori website, install dependensi dan mulai
   pengembangan server lokal
   pengembangan server lokal:
   ```sh
   pnpm install && pnpm dev
   ```
4. Buka [http://localhost:3000](http://localhost:3000) untuk melihat
   pembaruan secara real-time.

### Terjemah dokumentasi

1. Buat halaman baru di dalam `src/content/{locale}/`
2. Rujuk halaman yang setara dengan bahasa Inggris, atau bahasa lokal lain yang
   Anda mengerti, misalnya `src/content/en/create-a-theme.md`

### Terjemah bagian halaman

1. Buat file bahasa lokal baru di dalam `src/locales/{locale}.json`
2. Rujuk skema yang setara dengan bahasa Inggris, atau bahasa lokal lain yang
   Anda mengerti, misalnya `src/locales/en.json`
