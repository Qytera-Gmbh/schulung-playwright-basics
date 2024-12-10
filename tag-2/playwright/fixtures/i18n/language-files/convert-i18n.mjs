#!/usr/bin/env node

import console from "node:console";
import fs from "node:fs";
import process from "node:process";

// ============================================================================================== //
// Example: https://github.com/mattermost/mattermost/blob/master/webapp/channels/src/i18n/en.json
// ============================================================================================== //

function main() {
  const languageFile = process.argv[2];

  if (!languageFile) {
    console.error("");
    console.error("Please provide a language file to convert to camelCased i18n");
    console.error("");
    console.error("Usage: node convert-i18n.js <input> <output>");
    console.error("");
    process.exit(1);
  }
  const outputFile = process.argv[3];

  if (!outputFile) {
    console.error("");
    console.error("Please provide an output file to write the camelCased i18n to");
    console.error("");
    console.error("Usage: node convert-i18n.js <input> <output>");
    console.error("");
    process.exit(1);
  }

  // ============================================================================================ //
  // {
  //   "about.enterpriseEditione1": "Enterprise Edition",
  //   "about.enterpriseEditionLearn": "Learn more about Enterprise Edition at ",
  //   "about.enterpriseEditionSst": "High trust messaging for the enterprise",
  //   "about.enterpriseEditionSt": "Modern communication from behind your firewall."
  // }
  // ============================================================================================ //
  const parsedFile = JSON.parse(fs.readFileSync(languageFile, "utf-8"));
  // ============================================================================================ //
  // {
  //   "aboutEnterpriseEditione1": "about.enterpriseEditione1",
  //   "aboutEnterpriseEditionLearn": "about.enterpriseEditionLearn",
  //   "aboutEnterpriseEditionSst": "about.enterpriseEditionSst",
  //   "aboutEnterpriseEditionSt": "about.enterpriseEditionSt"
  // }
  // ============================================================================================ //
  const camelCased = convertToCamelcase(parsedFile, "");

  fs.writeFileSync(
    outputFile,
    JSON.stringify(
      camelCased,
      (key, value) => {
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          return sortObject(value);
        }
        return value;
      },
      2
    ),
    "utf8"
  );
}

/**
 * Transforms a string into a camelcased version.
 *
 * @param str the input string
 * @returns the camelcased string
 */
function toCamelCase(str, parentKey) {
  const key = str.trim();
  // Special case: the key is a number.
  if (/^\d+$/.test(key)) {
    return `${parentKey}${key}`;
  }
  // Split at characters that aren't alphanumeric.
  const splits = key.split(/[^a-zA-Z0-9]+/g);
  let result = "";
  for (let split = 0; split < splits.length; split++) {
    const subKey = splits[split];
    // Iterate through the subkey character by character. A character may only be uppercase iff:
    // - it is the first character of a split except the very first one (we don't want PascalCase)
    //   - e.g. "Hey-There" -> ["Hey", "There"] -> ["hey", "There"] -> "heyThere"
    // - it is in the middle of a split, but the previous character is lowercase already
    //   - e.g. the 'M' in "goodMorning"
    for (let i = 0; i < subKey.length - 1; i++) {
      const currentCharacter = subKey[i];
      if (split === 0 && i === 0) {
        if (/^\d/.test(currentCharacter)) {
          result = parentKey;
        }
        result = `${result}${currentCharacter.toLowerCase()}`;
      } else if (split > 0 && i === 0) {
        result = `${result}${currentCharacter.toUpperCase()}`;
      } else {
        const nextCharacter = subKey[i + 1];
        const isUpperCurrent = currentCharacter.toUpperCase() === currentCharacter;
        const isUpperNext = nextCharacter.toUpperCase() === nextCharacter;
        if (isUpperCurrent && isUpperNext) {
          result = `${result}${currentCharacter.toLowerCase()}`;
        } else {
          result = `${result}${currentCharacter}`;
        }
      }
    }
    // Can be zero if the input string ends with a non-alphanumeric character, for example:
    // "hello-there!".split(...) -> ["hello", "there", ""]
    if (subKey.length > 0) {
      const lastCharacter = subKey[subKey.length - 1];
      result = `${result}${lastCharacter.toLowerCase()}`;
    }
  }
  return result;
}

/**
 * Takes an input object and returns a copy that recursively maps each property to its JSON path.
 *
 * @param input the input object
 * @param prefix the current prefix (optional)
 * @returns the copy containing JSON paths
 */
function convertToCamelcase(input, prefix, parentKey) {
  let camelCased = {};
  for (const [key, value] of Object.entries(input)) {
    let camelCasedKey = toCamelCase(key, parentKey);
    const jsonPath = prefix ? `${prefix}.${key}` : key;
    // Duplicate prevention, e.g. 'team-edition and 'team_edition'.
    if (camelCasedKey in camelCased) {
      for (let i = 2; i < Number.MAX_SAFE_INTEGER; i++) {
        const nextKey = `${camelCasedKey}${i}`;
        if (!(nextKey in camelCased)) {
          camelCasedKey = nextKey;
          break;
        }
      }
    }
    if (typeof value === "object") {
      camelCased[camelCasedKey] = convertToCamelcase(value, jsonPath, camelCasedKey);
    }
    if (typeof value === "string") {
      camelCased[camelCasedKey] = jsonPath;
    }
  }
  return camelCased;
}

// Sort keys alphabetically to improve human readability.
// From: https://stackoverflow.com/a/31102605
function sortObject(input) {
  return Object.keys(input)
    .sort()
    .reduce((obj, key) => {
      obj[key] = input[key];
      return obj;
    }, {});
}

main();
