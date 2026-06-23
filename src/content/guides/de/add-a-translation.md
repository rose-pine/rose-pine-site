---
title: Eine Übersetzung hinzufügen
description: Eine Anleitung, die Rosé Pine Webseite zu internationalisieren.
author: butteronarchbtw
publishedAt: 2026-06-23T12:36:27+02:00
updatedAt: 2026-06-23T12:36:27+02:00
---

Sprache ist wunderschön und wir schätzen es wert, wenn du deine Sprache mit anderen teilen willst.
Im Folgenden beschreiben wir, wie unterschiedliche Teile der Webseite und Artikel übersetzt werden.

Obwohl es nicht zwingend notwendig ist, kannst du deine Änderungen in Echtzeit mit einer lokalen Entwicklungsumgebung anschauen.
Alternativ kannst du [deine Änderungen direkt auf GitHub machen](https://github.com/rose-pine/rose-pine-site).

## Deine lokale Entwicklungsumgebung einrichten

1. Forke und klone die [Rosé Pine Webseite](https://github.com/rose-pine/rose-pine-site).
2. Installiere [Node.js](https://nodejs.org/en/download) und [pnpm](https://pnpm.io/installation) gemäß den offiziellen Anleitungen.
3. Starte den Entwicklungsserver mit `pnpm dev` um eine Echtzeit-Vorschau des Inhaltes zu erhalten.

## Übersetze the Webseite

Kopiere die englische Sprachdatei und benenne sie mit deinem Sprachkürzel:

```diff
  src/i18n/locales/en.ts
+ src/i18n/locales/sd.ts
```

Ändere `name` in `config` zu dem Namen deiner Sprache und dann füge deine Übersetzungen hinzu:

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

Fehlende Übersetzungen fallen automatisch auf Englisch zurück.

## Anleitungen übersetzen

Mit der englischen Version als Vorlage, erstelle deine Anleitung:

```diff
  src/content/guides/en/create-a-theme.md
+ src/content/guides/sd/create-a-theme.md
```

Bemerke, dass der `sd` Ordner für unser Sindrain Beispiel hinzugefügt wurde und der Name der Anleitung gleichgeblieben ist.

Ändere die frontmatter-Metadaten am Anfang der Datei zwischen den `---` Markern mit einem Titel, einer Beschreibung, einem Autor und Datumsangaben.

```diff
  ---
  title: <title>
  description: <description>
  author: <username>
  publishedAt: 2025-11-09T12:00:00-06:00
  updatedAt: 2025-11-09T12:00:00-06:00
  ---
```

Der Nutzername des Autors wird mit einer Datei in `src/content/authors/` abgeglichen, also stelle sicher, dass du dich dort verewigst:

```diff
// src/content/authors/<username>.yml
+ name: "<name>"
+ image: "https://avatars.githubusercontent.com/<username>"
+ url: "https://example.com"
```

## Reiche deine Änderungen ein

Erstelle eine Pull Request auf [rose-pine/rose-pine-site](https://github.com/rose-pine/rose-pine-site). Wir überprüfen und teilen unsere Wertschätzung dafür, dass du Rosé Pine ein bisschen barrierefreier gemacht hast!
