import { test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Shard 1", () => {
  test.describe.configure({ mode: "default" });
  test("Test 1", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 1`));
  test("Test 2", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 2`));
  test("Test 3", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 3`));
});

test.describe("Shard 2", () => {
  test.describe.configure({ mode: "default" });
  test("Test 1", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 1`));
  test("Test 2", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 2`));
  test("Test 3", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 3`));
});

test.describe("Scattered", () => {
  test("Test 1", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 1`));
  test("Test 2", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 2`));
  test("Test 3", ({}, testInfo) =>
    console.log(`Worker ${testInfo.workerIndex} | Test 3`));
});

test("Free test 1", ({}, testInfo) =>
  console.log(`Worker ${testInfo.workerIndex} | Test 1`));
test("Free test 2", ({}, testInfo) =>
  console.log(`Worker ${testInfo.workerIndex} | Test 2`));
test("Free test 3", ({}, testInfo) =>
  console.log(`Worker ${testInfo.workerIndex} | Test 3`));
