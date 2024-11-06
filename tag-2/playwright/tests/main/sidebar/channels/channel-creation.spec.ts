import { ChannelsApi } from "playwright/api/channels-api";
import { TeamsApi } from "playwright/api/teams-api";
import { UsersApi } from "playwright/api/users-api";
import { getTestData } from "playwright/data/test-data";
import { getUserData } from "playwright/data/users/user-data";
import { chatTest } from "playwright/fixtures/fixtures";

for (const testData of getTestData("3")) {
  chatTest.describe("[3] channel creation", () => {
    chatTest.beforeAll(async ({ apiConfiguration }) => {
      const channelsApi = new ChannelsApi(await apiConfiguration(testData.user.email));
      const teamsApi = new TeamsApi(await apiConfiguration(testData.user.email));
      const usersApi = new UsersApi(await apiConfiguration(testData.user.email));
      const team = await teamsApi.getTeamByName({ path: { name: testData.team.name } });
      const user = await usersApi.getUserByEmail({
        path: { email: getUserData(testData.user.email).email },
      });
      for (const channel of await channelsApi.getChannelsForTeamForUser({
        path: { team_id: team.id, user_id: user.id },
      })) {
        if (channel.display_name === testData.name) {
          await channelsApi.deleteChannel({
            path: { channel_id: channel.id },
            query: { permanent: true },
          });
          break;
        }
      }
    });

    chatTest(testData.name, async ({ on, page }) => {
      await on(page).main.open();
      await on(page).main.sidebar.do.addChannel();
      await on(page).main.sidebar.menu.createChannel.do.createNewChannel();
      await on(page).main.modal.createNewChannel.do.fill({
        action: "create",
        mode: testData.mode,
        name: testData.name,
        purpose: testData.purpose,
      });
      await on(page).main.header.check.hasTitle(testData.name);
    });
  });
}
