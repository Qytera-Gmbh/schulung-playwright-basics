# Mattermost

[Mattermost](https://mattermost.com/) kann als Testobjekt auch lokal über Docker gestartet werden.

## Voraussetzungen

- [Docker](https://www.docker.com/)

## Setup

1. Mattermost bereitstellen:

   ```sh
   cd tag-2/app
   docker compose up -d
   ```

2. In der `tag-2/playwright/playwright.config.ts` die `baseURL` anpassen

3. Umgebungsvariablen für Mattermost vorbereiten:

   ```sh
   cd tag-2/playwright
   cp env.example .env
   ```

4. In der `.env`-Datei Passwörter für die User eintragen (Tokens kommen im nächsten Schritt)

5. Mattermost initialisieren (User erstellen, Berechtigungen setzen, API Tokens erstellen):

   ```sh
   cd tag-2/playwright
   npm install
   npx playwright install
   INIT=true npx playwright test init.spec.ts
   ```

   > [!IMPORTANT]
   > Die angezeigten API-Tokens müssen in der `.env`-Datei abgelegt werden, sonst funktionieren die Tests später nicht.
