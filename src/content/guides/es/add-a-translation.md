---
title: Añade una traducción
description: Un paso a paso para internacionalizar el sitio web de Rosé Pine.
author: mrodant
publishedAt: 2026-08-30T16:00:00+02:00
updatedAt: 2026-08-30T16:00:00+02:00
---

Los idiomas son preciosos y nos complace que quieras compartir el tuyo con el mundo. Más abajo, te enseñamos a traducir distintas partes del sitio web y sus artículos.

Aunque no es estrictamente necesario, tener un entorno de desarrollo local te permitirá ver en tiempo real los cambios que realices. Alternativamente, puedes [hacer cambios directamente desde Github](https://github.com/rose-pine/rose-pine-site).

## Prepara el entorno de desarrollo

1. Haz un *fork* y clona el [sitio web de Rosé Pine](https://github.com/rose-pine/rose-pine-site).
2. Instala [Node.js](https://nodejs.org/es/download) y [pnpm](https://pnpm.io/es/installation) siguiendo sus manuales oficiales.
3. Inicia el servidor de desarrollo con `pnpm dev` para tener una vista previa en tiempo real del contenido.

## Traduce el sitio web

Copia el archivo con el texto en inglés y renómbralo con el código de tu idioma:

```diff
  src/locales/en.ts
+ src/locales/sd.ts
```

Actualiza `name` dentro de `config` con el nombre de tu idioma, y añade las traducciones:

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

Las frases no traducidas se mostrarán en inglés por defecto.

## Traduce las guías

Usando como referencia la versión en inglés, crea la guía a traducir:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

Observa que hemos creado una carpeta `sd` para nuestro ejemplo, el sindarin, mientras que el nombre del archivo con el texto es el mismo.

Actualiza el *frontmatter*—metadatos al principio del archivo, entre dos líneas formadas por `---`—con un título, una descripción, autoría y fechas.

```
---
title: <título>
description: <descripción>
author: <nombre de usuario>
publishedAt: 2025-11-09T12:00:00-06:00
updatedAt: 2025-11-09T12:00:00-06:00
---
```

El nombre de usuario se corresponderá con un archivo en la carpeta `src/content/authors/`, así que asegúrate de añadirte, por ejemplo:

```diff
// src/content/authors/<nombre de usuario>.yaml
+ name: "<nombre>"
+ image: "https://avatars.githubusercontent.com/<nombre de usuario>"
+ url: "https://ejemplo.com"
```

## Solicita incorporar tus cambios

Crea una *pull request* en [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). La revisaremos y, una vez integradas las modificaciones, ¡te compartiremos nuestro aprecio por hacer Rosé Pine un poquito más accesible!
