<h1>Playwright Übungsprojekt</h1>

In diesem Projekt liegen Übungsaufgaben und die dazu passenden Lösungen.

> [!TIP]
> Der [offiziellen Dokumentation](https://playwright.dev/docs/intro) können zu allen hier aufgeführten Themen genauere Details entnommen werden.

## Voraussetzungen

- [Node.js](https://nodejs.org/en)
- [VS Code](https://code.visualstudio.com/) oder [VS Codium](https://vscodium.com/)

Es empfiehlt sich sehr, die folgende Erweiterung beim Schreiben von Tests mit Playwright in JavaScript/TypeScript zu installieren:

- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Setup

Mit den folgenden Befehlen kann das Projekt zum Laufen gebracht werden:

```sh
cd tag-1/playwright
npm install
npx playwright install # installiert Systemlibraries & Browser
```

## Tests ausführen

### Alle Tests Ausführen

Um alle Tests auszuführen, kann man den folgenden Befehl verwenden:

```sh
cd tag-1/playwright
npx playwright test
```

### Bestimmte Tests Ausführen

Zur Ausführung bestimmter Tests lassen sich die folgenden Befehle verwenden:

```sh
cd tag-1/playwright

# Bestimmte Datei ausführen
npx playwright test --spec path/to/spec.ts
# Tests ausführen, die "first" im Titel haben
npx playwright test --grep "first"
```
