---
title: 添加翻译
description: 翻译人员的贡献指南。
priority: 98
---

## 设置您的开发环境

> 请随时在 GitHub 上直接进行任何更改。

1. 克隆和分叉[Rosé Pine 网站](https://github.com/rose-pine/rose-pine-site)。
2. 安装 [node](https://nodejs.org) 和 [pnpm](https://pnpm.io/installation)。
3. 在网站目录中，安装依赖项并启动本地开发服务器：
   ```sh
   pnpm install && pnpm dev
   ```
4. 转到 [http://localhost:3000](http://localhost:3000) 查看实时更新。

### 翻译文档

1. 在 `src/content/{locale}/` 目录下创建一个新页面。
2. 参考英文等效页面，或者您熟悉的其他语言，例如 `src/content/en/create-a-theme.md`。

### 翻译页面片段

1. 在 `src/locales/{locale}.json` 目录下创建一个新的语言文件。
2. 参考英文等效模式，或者您熟悉的其他语言，例如 `src/locales/en.json`。
