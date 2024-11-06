import { styleText } from "node:util";
import { env, TestUser } from "playwright/global-settings";

export interface TestUserData {
  email: TestUser;
  firstName: string;
  handle: string;
  language: "de" | "en";
  lastName: string;
  password: string;
}

export function getUserData(username: TestUser): TestUserData {
  switch (username) {
    case "jane@example.org":
      return {
        email: "jane@example.org",
        firstName: "Jane",
        handle: "jane.doe",
        language: "en",
        lastName: "Doe",
        password: env("PASSWORD_JANE"),
      };
    case "john@example.org":
      return {
        email: "john@example.org",
        firstName: "John",
        handle: "john.doe",
        language: "de",
        lastName: "Doe",
        password: env("PASSWORD_JOHN"),
      };
    default:
      throw new Error(`Unknown user: ${styleText("red", username)}`);
  }
}
