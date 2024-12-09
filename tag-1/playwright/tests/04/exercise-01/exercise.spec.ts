import { test } from "@playwright/test";

test("Test A", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test A`));
test("Test B", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test B`));
test("Test C", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test C`));
test("Test D", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test D`));
test("Test E", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test E`));
test("Test F", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test F`));
test("Test G", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test G`));
test("Test H", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test H`));
test("Test I", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test I`));
test("Test J", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test J`));
test("Test K", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test K`));
test("Test L", ({}, testInfo) => console.log(`Worker ${testInfo.workerIndex} | Test L`));
