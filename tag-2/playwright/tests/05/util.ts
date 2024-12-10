import { Page } from "@playwright/test";
import { env } from "global-settings";
import { LandingPage } from "pages/landing/landing-page";
import { LoginPage } from "pages/login/login-page";

export async function login(page: Page) {
  const landingPage = new LandingPage(page);
  await landingPage.open();
  await landingPage.getCheckbox("remember-preferences").check();
  await landingPage.getButton("browser").click();

  const loginPage = new LoginPage(page);
  await loginPage.getInput("username").fill("jane@example.org");
  await loginPage.getInput("password").fill(env("PASSWORD_JANE"));
  await loginPage.getButton("login").click();
}
