import { ChannelsApi } from "playwright/api/channels-api";
import { PostsApi } from "playwright/api/posts-api.ts";
import { UsersApi } from "playwright/api/users-api";
import { getTestData } from "playwright/data/test-data";
import { chatTest } from "playwright/fixtures/fixtures";

chatTest.describe.configure({ mode: "default" });

for (const testData of getTestData("5")) {
  chatTest.describe("[5] send new message", () => {
    chatTest.beforeAll(async ({ apiConfiguration }) => {
      const channelsApi = new ChannelsApi(await apiConfiguration(testData.author.email));
      const usersApi = new UsersApi(await apiConfiguration(testData.author.email));
      const postsApi = new PostsApi(await apiConfiguration(testData.author.email));
      const channel = await channelsApi.getChannelByNameForTeamName({
        path: { channel_name: testData.channel.name, team_name: testData.team.name },
      });
      const user = await usersApi.getUserByEmail({ path: { email: testData.author.email } });
      for await (const post of postsApi.getPostsForChannel({ path: { channel_id: channel.id } })) {
        if (post.user_id === user.id) {
          await postsApi.deletePost({ path: { post_id: post.id } });
        }
      }
    });

    chatTest(testData.description, async ({ on, page }) => {
      await on(page).main.open();
      await on(page).main.editor.do.sendMessage({ text: testData.text });
      await on(page)
        .main.posts.getPost({ author: testData.author.handle, last: true })
        .check.equals({ author: testData.author.handle, message: testData.text });
    });
  });
}
