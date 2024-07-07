---
title: Bir çeviri ekle
description: Çevirmenler için katkıda bulunma rehberi.
priority: 98
---

## Geliştirme ortamınızı ayarlayın

> Herhangi bir değişikliği doğrudan GitHub'da yapmaktan çekinmeyin

1. [Rosé Pine web sitesini](https://github.com/rose-pine/rose-pine-site) forklayın ve klonlayın.
2. [node'u](https://nodejs.org) ve [pnpm'i](https://pnpm.io/installation) yükleyin.
3. Web sitesinin dizinindeyken bağımlılıkları yükleyin ve
   yerel geliştirme sunucusunu başlatın:
   ```sh
   pnpm install && pnpm dev
   ```
4. Değişiklikleri gerçek zamanda görüntülemek için 
   http://localhost:3000 adresine gidin.

### Dökümantasyon çevirin

1. `src/content/{locale}/` dizininde yeni bir sayfa oluşturun
2. İngilizce eşdeğer sayfayı veya rahat olduğunuz başka bir
   yerel ayarı referans alın, örneğin `src/content/en/create-a-theme.md`

### Sayfa snippet'lerini çevirin

1. `src/locales/{locale}.json` dizininde yeni bir yerel ayar dosyası oluşturun
2. İngilizce eşdeğer şemayı veya rahat olduğunuz başka bir 
yerel ayarı referans alın, örneğin `src/locales/en.json`