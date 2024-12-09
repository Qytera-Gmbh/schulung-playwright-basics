# Exercise 01

In dieser Übung soll der erste eigene Testcase geschrieben werden.

Der Test soll:

1. Den Party Planner aufrufen: https://party-planner.qtaf.org
2. Den Namen `Penny Playwright` in den Input mit Test-ID `name` schreiben
3. Überprüfen, dass der Input den Value `Penny Playwright` hat

## Bausteine:

- Seite aufrufen: `page.goto()`
- Location: `page.getByTestId()`
- Text eingeben: `fill()`

## Hilfreiche URLs

- Ersten Test schreiben: https://playwright.dev/docs/writing-tests#first-test
- Location anhand von Test IDs: https://playwright.dev/docs/locators#locate-by-test-id
- Value überprüfen: https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-value
- Test ausführen: https://playwright.dev/docs/running-tests#command-line
