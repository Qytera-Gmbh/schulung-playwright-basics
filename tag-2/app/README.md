# Mattermost

[Mattermost](https://mattermost.com/) kann als Testobjekt lokal über Docker gestartet werden.

## Voraussetzungen

- [Docker](https://www.docker.com/)

## Setup

1. Mattermost bereitstellen:

   ```sh
   cd tag-2/app
   docker compose up -d
   ```

2. In der `tag-2/playwright/playwright.config.ts` die `baseURL` anpassen
