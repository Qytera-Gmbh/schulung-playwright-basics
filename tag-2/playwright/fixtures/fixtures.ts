import { mergeTests } from "@playwright/test";
import { apiTest } from "./api/api-fixture";
import { i18nTest } from "./i18n/i18n-fixture";
import { utilityTest } from "./pages/page-fixture";
import { userTest } from "./users/user-fixture";

export const chatTest = mergeTests(apiTest, i18nTest, userTest, utilityTest);
