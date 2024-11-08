// @ts-check

import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { perfectionist },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off", // Required for json() in API calls.
      "@typescript-eslint/no-unsafe-return": "off", // Required for json() in API calls.
      "no-empty-pattern": "off", // Playwright fixtures are often empty objects.
      "perfectionist/sort-array-includes": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-enums": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-exports": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-interfaces": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-named-exports": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-object-types": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-objects": ["error", { order: "asc", type: "alphabetical" }],
      "perfectionist/sort-union-types": ["error", { order: "asc", type: "alphabetical" }],
    },
  },
  { files: ["**/*.mjs"], ...tseslint.configs.disableTypeChecked }
);
