import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

dotenv.config({ path: path.join(__dirname, ".env") });

/**
 * Contains useful project paths.
 */
const PROJECT_PATHS = {
  /**
   * The paths where I18N data is stored.
   */
  i18n: {
    de: path.join(__dirname, "fixtures", "i18n", "language-files", "de.json"),
    en: path.join(__dirname, "fixtures", "i18n", "language-files", "en.json"),
  },
  tempdata: {
    auth: {
      /**
       * The paths where UI authentication data is stored.
       */
      ui: {
        admin: path.join(__dirname, ".tempdata", "auth", "ui", "admin.json"),
        jane: path.join(__dirname, ".tempdata", "auth", "ui", "jane.json"),
        john: path.join(__dirname, ".tempdata", "auth", "ui", "john.json"),
      },
    },
  },
};

/**
 * The default auth file to be used for all tests unless specified otherwise. This basically defines
 * which user will run all tests.
 */
const PROJECT_DEFAULT_AUTH_FILE = PROJECT_PATHS.tempdata.auth.ui.jane;

/**
 * Dependent projects for the main project. The setup project must be a dependent project if the
 * auth file is missing, because running the logins first ensures that the auth files are available
 * for the main tests. This will always be the case in the context of CI/CD pipelines. Outside of
 * those, we usually have the files already, so there's no need to run the login tests all the time.
 *
 * Just remember to run the login tests as soon as the tests fail due to expired sessions.
 */
const PROJECT_DEPENDENCIES = !fs.existsSync(PROJECT_DEFAULT_AUTH_FILE) ? ["setup-auth"] : [];

/**
 * All users which are available for testing.
 */
export type TestUser = "jane@example.org" | "john@example.org";

/**
 * The global project settings.
 */
export const GLOBAL_SETTINGS = {
  defaultUser: {
    authFile: PROJECT_DEFAULT_AUTH_FILE,
    email: "jane@example.org",
  },
  paths: PROJECT_PATHS,
  projectDependencies: PROJECT_DEPENDENCIES,
} as const;

/**
 * Returns the value of an environment variable.
 *
 * @param variable the variable to return
 * @returns the value
 */
export function env(
  variable:
    | "PASSWORD_ADMIN"
    | "PASSWORD_JANE"
    | "PASSWORD_JOHN"
    | "TOKEN_ADMIN"
    | "TOKEN_JANE"
    | "TOKEN_JOHN"
): string {
  if (!process.env[variable]) {
    throw new Error(`Environment variable undefined: ${styleText("red", variable)}`);
  }
  return process.env[variable];
}
