<h1>Playwright Beispielprojekt</h1>

In diesem Projekt kann man sich ansehen, wie ein "echtes" Playwright-Projekt aufgebaut werden kann, inklusive:

- Verwaltung von Credentials & Secrets
- Authentication
- Erstellung von sauberen Page Objects
- Page Object Fixtures
- I18N

## Setup

1. Playwright installieren:

   ```sh
   cd tag-2/playwright
   npm install
   npx playwright install
   ```

2. Umgebungsvariablen für Mattermost vorbereiten:

   ```sh
   cd tag-2/playwright
   cp env.example .env
   ```

3. In der `.env`-Datei Passwörter für die User eintragen (Tokens kommen im nächsten Schritt)

4. Mattermost initialisieren (User erstellen, Berechtigungen setzen, API Tokens erstellen):

   ```sh
   cd tag-2/playwright
   npm install
   npx playwright install
   INIT=true npx playwright test init.spec.ts
   ```

> [!IMPORTANT]
> Die angezeigten API-Tokens müssen in der `.env`-Datei abgelegt werden, sonst funktionieren die Tests später nicht.

## Tests ausführen

Um alle Tests auszuführen kann man den folgenden Befehl verwenden:

```sh
cd tag-2/playwright
npx playwright test
```
