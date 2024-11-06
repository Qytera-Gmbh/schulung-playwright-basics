import test from "@playwright/test";
import fs from "node:fs";
import { styleText } from "node:util";
import { getUserData, TestUserData } from "playwright/data/users/user-data";
import { GLOBAL_SETTINGS } from "playwright/global-settings";
import { I18N } from "./i18n";

type I18N = typeof I18N;

export const i18nTest = test.extend<{
  translate: (key: I18N[keyof I18N], language?: TestUserData["language"]) => string;
}>({
  translate: async ({}, use) => {
    await use((key, language) => {
      const effectiveLanguage = language ?? getUserData(GLOBAL_SETTINGS.defaultUser.email).language;
      const dictionary = CACHE.get(effectiveLanguage);
      if (dictionary) {
        return dictionary[key];
      }
      let languageFile;
      switch (effectiveLanguage) {
        case "de":
          languageFile = GLOBAL_SETTINGS.paths.i18n.de;
          break;
        case "en":
          languageFile = GLOBAL_SETTINGS.paths.i18n.en;
          break;
        default:
          throw new Error(`Unknown language: ${styleText("red", effectiveLanguage)}`);
      }
      const parsedFile: Record<string, string> = JSON.parse(fs.readFileSync(languageFile, "utf-8"));
      CACHE.set(effectiveLanguage, parsedFile);
      return parsedFile[key];
    });
  },
});

const CACHE = new Map<TestUserData["language"], Record<string, string>>();
