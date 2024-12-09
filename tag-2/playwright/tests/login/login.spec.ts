import { getTestData } from "../../data/test-data";
import { chatTest } from "../../fixtures/fixtures";

for (const testData of getTestData("1")) {
  chatTest.describe("[1] login", () => {
    chatTest(testData.email, async ({ on, page }) => {
      await on(page).landing.open();
      await on(page).landing.do.choose({ button: "browser", remember: true });
      await on(page).login.check.isFocused("Password");
      await on(page).login.do.enterCredentials(testData.email, testData.password, {
        uiAuthFileUser: testData.email,
      });
    });
  });
}
