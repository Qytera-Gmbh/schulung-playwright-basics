import { getTestData } from "playwright/data/test-data";
import { chatTest } from "playwright/fixtures/fixtures";

for (const channel of getTestData("2")) {
  chatTest.describe("[2] channel navigation", () => {
    chatTest(channel.display_name, async ({ on, page }) => {
      await on(page).main.open();
      await on(page).main.sidebar.do.openChannel(channel.display_name);
      await on(page).main.header.check.hasTitle(channel.display_name);
    });
  });
}
