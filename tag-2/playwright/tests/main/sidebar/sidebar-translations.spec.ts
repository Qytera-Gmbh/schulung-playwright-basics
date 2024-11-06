import { expect } from "@playwright/test";
import { chatTest } from "playwright/fixtures/fixtures";
import { I18N } from "playwright/fixtures/i18n/i18n";

chatTest("[4] channel list translations", async ({ on, page, translate }) => {
  await on(page).main.open();
  await expect(on(page).main.sidebar.getButton("add-channels")).toHaveText(
    translate(I18N.sidebarLeftAddChannelsCta)
  );
  await expect(on(page).main.sidebar.getButton("channels-group-header")).toHaveText(
    translate(I18N.sidebarLeftSidebarChannelMenuChannels).toUpperCase()
  );
});
