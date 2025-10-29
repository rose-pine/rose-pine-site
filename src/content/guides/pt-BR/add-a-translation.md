---
title: Adicionar uma tradução
description: Guia de contribuição para tradutores.
priority: 98
---

---

## Configure seu ambiente de desenvolvimento

> Sinta-se à vontade para fazer alterações diretamente no GitHub

1. Faça um fork e clone o [site Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Instale o [Node](https://nodejs.org) e o [pnpm](https://pnpm.io/installation).
3. Dentro do diretório do site, instale as dependências e inicie o
   servidor de desenvolvimento local:

   ```sh
   pnpm install && pnpm dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) para ver as atualizações
   em tempo real.

### Traduzir a documentação

1. Crie uma nova página dentro de `src/content/{locale}/`
2. Consulte a página equivalente em inglês ou outro idioma com o qual você
   esteja familiarizado, por exemplo: `src/content/en/create-a-theme.md`

### Traduzir trechos de página

1. Crie um novo arquivo de localidade dentro de `src/locales/{locale}.json`
2. Consulte o esquema equivalente em inglês ou outro idioma com o qual você
   esteja familiarizado, por exemplo: `src/locales/en.json`
