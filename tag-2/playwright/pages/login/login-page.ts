import { expect } from "@playwright/test";
import { styleText } from "node:util";
import { getUserData } from "playwright/data/users/user-data";
import { chatTest } from "playwright/fixtures/fixtures";
import { GLOBAL_SETTINGS } from "playwright/global-settings";
import { Actionable, Checkable, Navigable, PageObject } from "playwright/pages/page";

export class LoginPage extends PageObject implements Actionable, Checkable, Navigable {
  public get do() {
    return {
      /**
       * Enters the specified credentials on the login page.
       *
       * @param email the user's email
       * @param password the user's password
       * @param options additional options to consider
       */
      enterCredentials: async (
        email: string,
        password: string,
        options?: {
          /**
           * Specifies whether the user's UI session should be saved to their corresponding session
           * file. If `undefined`, no session will be saved.
           *
           * @defaultValue undefined
           */
          uiAuthFileUser?: Parameters<typeof getUserData>[0];
        }
      ) => {
        await chatTest.step("enter username", async () => {
          await this.getInput("username").fill(email);
        });
        await chatTest.step("enter password", async () => {
          await this.getInput("password").fill(password);
        });
        // Wait for an authenticated request/response before saving the session to ensure we're fully
        // logged in (just grab one from the browser).
        const applicationPromise = chatTest.step("prepare login handling", async () => {
          return this.page.waitForRequest("/api/v4/users/me/channels");
        });
        await chatTest.step("click login button", async () => {
          await this.getButton("login").click();
        });
        await applicationPromise;
        if (options?.uiAuthFileUser) {
          const user = options.uiAuthFileUser;
          let authFile;
          switch (user) {
            case "jane@example.org":
              authFile = GLOBAL_SETTINGS.paths.tempdata.auth.ui.jane;
              break;
            case "john@example.org":
              authFile = GLOBAL_SETTINGS.paths.tempdata.auth.ui.john;
              break;
            default:
              throw new Error(`Unknown user: ${styleText("red", user)}`);
          }
          await chatTest.step("save ui session", async () => {
            await this.page.context().storageState({ path: authFile });
          });
        }
      },
    };
  }

  public get check() {
    return {
      isFocused: async (passwordPlaceholder: string) => {
        await chatTest.step(`check username focus`, async () => {
          await expect(this.getInput("username")).toBeFocused();
        });
        await chatTest.step(`check password placeholder: ${passwordPlaceholder}`, async () => {
          await expect(this.getInput("password")).toHaveAttribute(
            "placeholder",
            passwordPlaceholder
          );
        });
      },
    };
  }

  public async open() {
    await this.page.goto("/login");
  }

  /**
   * Returns an input element that is present in this page object.
   *
   * @param input the input element
   * @returns the element
   */
  public getInput(input: "password" | "username") {
    switch (input) {
      case "username":
        return this.root.locator("#input_loginId");
      case "password":
        return this.root.locator("#input_password-input");
    }
  }

  /**
   * Returns a button element that is present in this page object.
   *
   * @param button the button element
   * @returns the element
   */
  public getButton(button: "login") {
    switch (button) {
      case "login":
        return this.root.locator("#saveSetting");
    }
  }
}
