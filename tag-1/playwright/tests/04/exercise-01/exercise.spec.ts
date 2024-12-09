import { test } from "@playwright/test";
import { setTimeout } from "timers/promises";

// ========================================================================================================================= //
// Hilfreiche URLs:
// - Test Hooks:              https://playwright.dev/docs/api/class-test
// - Parallelism:             https://playwright.dev/docs/test-parallel
// - test.describe.configure: https://playwright.dev/docs/api/class-test#test-describe-configure
// ========================================================================================================================= //

// In dieser Aufgabe sollen durch geschicktes Platzieren von...
//
// - test.describe()
// - test.describe.configure({ mode: "default" })
//
// ... folgende Regeln eingehalten werden:
// 
// - die beforeEach/afterEach Hooks werden nur so getriggert, wie es ihr Titel beschreibt
// - gerade Zahlen dürfen auf unterschiedlichen Workern ausgeführt werden
// - Tests 1,5,7 dürfen nicht auf unterschiedlichen Workern ausgeführt werden
// - Tests 3,6,9 dürfen nicht auf unterschiedlichen Workern ausgeführt werden
//
// 
// Folgender Befehl muss zur Ausführung verwendet werden: npx playwright test --workers 3 --reporter sort-reporter.ts

test.afterEach("I run only after even tests", ({}, testInfo) => { console.log(`After    | ${testInfo.title}`); });
test.beforeEach("I run only before tests divisibly by 5", ({}, testInfo) => { console.log(`Before   | ${testInfo.title}`); });
test.beforeAll("I run once before all tests divisible by three", ({}, testInfo) => { console.log(`Before /3 | ${testInfo.title}`); });

test("Test 1", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 1`); });
test("Test 2", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 2`); });
test("Test 3", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 3`); });
test("Test 4", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 4`); });
test("Test 5", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 5`); });
test("Test 6", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 6`); });
test("Test 7", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 7`); });
test("Test 8", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 8`); });
test("Test 9", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 9`); });
