import { expect, test } from "@playwright/test";

// ========================================================================================================================= //
// Hilfreiche URLs:
// - Test Hooks:            https://playwright.dev/docs/api/class-test
// - Tests parametrisieren: https://playwright.dev/docs/test-parameterize#parameterized-tests
// ========================================================================================================================= //

// 1. Einen beforeEach() - Hook implementieren, der zu https://party-planner.qtaf.org navigiert

// TODO...

test.describe("Food checkboxes", () => {

  // 2. Einen datengetriebenen Test implementieren, der:
  //    - Ein Finger Food anklickt
  //    - Überprüft, dass das Finger Food checked ist
  // 3. Den Test parametrisieren und die folgenden Iterationen definieren:
  //    - Ice Cream
  //    - Pizza
  //    - Veggie Sticks
  // 
  // Wichtig: Der Test soll datengetrieben sein, d.h. es sollte kein Loop innerhalb des Tests vorhanden sein!

  // TODO...

});

test.describe("Music chips", () => {

  // 4. Einen datengetriebenen Test implementieren, der:
  //    - Einen Musik-Chip anklickt
  //    - Überprüft, dass das Häkchen sichtbar ist
  // 5. Einen afterEach() - Hook implementieren, der den Chip erneut anklickt (soll Cleanup simulieren)
  // 6. Den Test parametrisieren und die folgenden Iterationen definieren:
  //    - Raven Riot
  //    - Lunar Lightning
  //    - Harmony Haven
  // 
  // Wichtig: Der Test soll datengetrieben sein, d.h. es sollte kein Loop innerhalb des Tests vorhanden sein!

  // TODO...

});
