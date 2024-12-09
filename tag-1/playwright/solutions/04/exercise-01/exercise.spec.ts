import { test } from "@playwright/test";
import { setTimeout } from "timers/promises";

test.describe("even", () => {
    test.afterEach("I run only after even tests", ({}, testInfo) => { console.log(`After    | ${testInfo.title}`); });
    test("Test 2", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 2`); });
    test("Test 4", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 4`); });
    test("Test 8", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 8`); });
});

test.describe("odd", () => {    
    test.describe.configure({ mode: 'default' });
    test("Test 1", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 1`); });
    test.describe("divisible by 5", () => {
        test.beforeEach("I run only before tests divisibly by 5", ({}, testInfo) => { console.log(`Before   | ${testInfo.title}`); });
        test("Test 5", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 5`); });
    });
    test("Test 7", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 7`); });
});

test.describe("divisibly by three", () => {
    test.describe.configure({ mode: 'default' });
    test("Test 3", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 3`); });
    test("Test 6", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 6`); });
    test("Test 9", async ({}, testInfo) => { await setTimeout(100); console.log(`Worker ${testInfo.workerIndex} | Test 9`); });
});