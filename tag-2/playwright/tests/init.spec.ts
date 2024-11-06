import { styleText } from "node:util";
import { ApiConfiguration } from "playwright/api/base-api";
import { SystemApi } from "playwright/api/system-api";
import { TeamsApi } from "playwright/api/teams-api";
import { UsersApi } from "playwright/api/users-api";
import { getTeamData } from "playwright/data/teams/team-data";
import { getUserData } from "playwright/data/users/user-data";
import { chatTest } from "playwright/fixtures/fixtures";

// We need to make sure that these setup "tests" run in sequence. First the admin user, then the
// teams, ...
chatTest.describe.configure({ mode: "default" });

const ADMIN_DATA = {
  email: "admin@example.org",
  firstName: "Darth",
  handle: "admin",
  lastName: "Admin",
  password: process.env.PASSWORD_ADMIN ?? "unknown",
};

chatTest.beforeAll(async ({ request }) => {
  if (ADMIN_DATA.password === "unknown") {
    throw new Error(
      `Cannot run init tests: ${styleText("red", "failed to find admin password in environment variables")}`
    );
  }
  await chatTest.step("create admin user if they do not exist yet", async () => {
    try {
      // If an error occurs here, we know that the admin user does not exist yet.
      const usersApi = new UsersApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      await usersApi.getUserByEmail({ path: { email: ADMIN_DATA.email } });
      console.log(styleText("gray", `Admin user exists already: ${ADMIN_DATA.email}`));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      const usersApi = new UsersApi(new ApiConfiguration({}, request));
      const response = await usersApi.createUser({
        body: {
          email: ADMIN_DATA.email,
          password: ADMIN_DATA.password,
          username: ADMIN_DATA.handle,
        },
      });
      console.log(`Created admin user: ${styleText("green", response.email)}`);
    }
  });
});

for (const teamData of [getTeamData("playwright")]) {
  chatTest.describe("create teams", () => {
    chatTest(teamData.display_name, async ({ request }) => {
      const teamsApi = new TeamsApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      for await (const team of teamsApi.getAllTeams()) {
        if (team.name === teamData.name) {
          console.log(
            styleText("gray", `Team exists already: ${teamData.display_name} (${teamData.name})`)
          );
          return;
        }
      }
      const response = await teamsApi.createTeam({
        body: {
          display_name: teamData.display_name,
          name: teamData.name,
          type: teamData.type,
        },
      });
      console.log(`Created team: ${styleText("green", response.display_name)}`);
      const systemApi = new SystemApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      // Complete the onboarding to skip the plugin installation screen.
      await systemApi.completeOnboarding({
        body: { install_plugins: [], organization: response.display_name },
      });
      console.log(`Completed onboarding for team: ${styleText("green", response.display_name)}`);
    });
  });
}

for (const userData of [getUserData("jane@example.org"), getUserData("john@example.org")]) {
  chatTest.describe("create users", () => {
    chatTest(userData.handle, async ({ request }) => {
      const usersApi = new UsersApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      for await (const user of usersApi.getUsers()) {
        if (user.email === userData.email) {
          console.log(styleText("gray", `User exists already: ${userData.email}`));
          return;
        }
      }
      const response = await usersApi.createUser({
        body: {
          email: userData.email,
          password: userData.password,
          username: userData.handle,
        },
      });
      console.log(`Created user: ${styleText("green", response.email)}`);
    });
  });
}

chatTest("enable access tokens", async ({ request }) => {
  const systemApi = new SystemApi(
    new ApiConfiguration(
      {
        login_id: ADMIN_DATA.email,
        password: ADMIN_DATA.password,
      },
      request
    )
  );
  const currentConfig = await systemApi.getConfig();
  if (currentConfig.ServiceSettings.EnableUserAccessTokens) {
    console.log(styleText("gray", "Personal access tokens are enabled already"));
    return;
  }
  await systemApi.updateConfig({
    body: {
      ...currentConfig,
      ServiceSettings: {
        ...currentConfig.ServiceSettings,
        EnableUserAccessTokens: true,
      },
    },
  });
  console.log(`Enabled: ${styleText("green", "personal access tokens")}`);
});

for (const userData of [
  ADMIN_DATA,
  getUserData("jane@example.org"),
  getUserData("john@example.org"),
]) {
  chatTest.describe("create access tokens", () => {
    chatTest(userData.handle, async ({ request }) => {
      const usersApi = new UsersApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      const user = await usersApi.getUserByEmail({ path: { email: userData.email } });
      const tokenDescription = "PAT for E2E tests";
      for await (const token of usersApi.getUserAccessTokensForUser({
        path: { user_id: user.id },
      })) {
        if (token.description === tokenDescription) {
          console.log(styleText("gray", "User has a personal access token already"));
          return;
        }
      }
      const tokenResponse = await usersApi.createUserAccessToken({
        body: { description: tokenDescription },
        path: { user_id: user.id },
      });
      console.log(`Created access token: ${styleText("green", tokenResponse.token)}`);
    });
  });
}

// This seems to be necessary to actually let them log in. Otherwise, we'd see invalid credentials
// errors when attempting to log in. Mattermost bug? Such test data setups are probably simply not
// intended.
for (const userData of [getUserData("jane@example.org"), getUserData("john@example.org")]) {
  chatTest.describe("reset user passwords", () => {
    chatTest(userData.handle, async ({ request }) => {
      const usersApi = new UsersApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      const user = await usersApi.getUserByEmail({ path: { email: userData.email } });
      await usersApi.updateUserPassword({
        body: { new_password: userData.password },
        path: { user_id: user.id },
      });
      console.log(`Updated password: ${styleText("green", userData.password)}`);
    });
  });
}

for (const userData of [getUserData("jane@example.org"), getUserData("john@example.org")]) {
  chatTest.describe("disable onboarding tour", () => {
    chatTest(userData.handle, async ({ request }) => {
      const usersApi = new UsersApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      const user = await usersApi.getUserByEmail({ path: { email: userData.email } });
      // Values taken from network tab in browser.
      await usersApi.updatePreferences({
        body: [
          {
            category: "onboarding_task_list",
            name: "onboarding_task_list_show",
            user_id: user.id,
            value: "false",
          },
          {
            category: "onboarding_task_list",
            name: "onboarding_task_list_open",
            user_id: user.id,
            value: "false",
          },
        ],
        path: { user_id: user.id },
      });
      console.log(`Disabled onboarding tour for: ${styleText("green", userData.email)}`);
    });
  });
}

for (const userData of [getUserData("jane@example.org"), getUserData("john@example.org")]) {
  chatTest.describe("disable message drafts tip", () => {
    chatTest(userData.handle, async ({ request }) => {
      const usersApi = new UsersApi(
        new ApiConfiguration(
          {
            login_id: ADMIN_DATA.email,
            password: ADMIN_DATA.password,
          },
          request
        )
      );
      const user = await usersApi.getUserByEmail({ path: { email: userData.email } });
      // Values taken from network tab in browser.
      await usersApi.updatePreferences({
        body: [
          {
            category: "drafts",
            name: "drafts_tour_tip_showed",
            user_id: user.id,
            value: '{"drafts_tour_tip_showed":true}',
          },
        ],
        path: { user_id: user.id },
      });
      console.log(`Disabled message draft tip for: ${styleText("green", userData.email)}`);
    });
  });
}

for (const teamData of [getTeamData("playwright")]) {
  chatTest.describe("add users to teams", () => {
    for (const userData of [getUserData("jane@example.org"), getUserData("john@example.org")]) {
      chatTest(`team: ${teamData.name}, user: ${userData.handle}`, async ({ request }) => {
        const teamsApi = new TeamsApi(
          new ApiConfiguration(
            {
              login_id: ADMIN_DATA.email,
              password: ADMIN_DATA.password,
            },
            request
          )
        );
        const usersApi = new UsersApi(
          new ApiConfiguration(
            {
              login_id: ADMIN_DATA.email,
              password: ADMIN_DATA.password,
            },
            request
          )
        );
        const team = await teamsApi.getTeamByName({ path: { name: teamData.name } });
        const user = await usersApi.getUserByEmail({ path: { email: userData.email } });
        for await (const member of teamsApi.getTeamMembers({ path: { team_id: team.id } })) {
          if (member.user_id === user.id) {
            console.log(
              styleText("gray", `User ${user.email} is a member of team ${team.name} already`)
            );
            return;
          }
        }
        await teamsApi.addTeamMember({
          body: { team_id: team.id, user_id: user.id },
          path: { team_id: team.id },
        });
        console.log(
          `Invited user ${styleText("green", user.email)} to team: ${styleText("green", team.name)}`
        );
      });
    }
  });
}

chatTest("disable preview mode banner", async ({ request }) => {
  const systemApi = new SystemApi(
    new ApiConfiguration(
      {
        login_id: ADMIN_DATA.email,
        password: ADMIN_DATA.password,
      },
      request
    )
  );
  const currentConfig = await systemApi.getConfig();
  if (!currentConfig.EmailSettings.EnablePreviewModeBanner) {
    console.log(styleText("gray", "Email notification banner is disabled already"));
    return;
  }
  await systemApi.updateConfig({
    body: {
      ...currentConfig,
      EmailSettings: {
        ...currentConfig.EmailSettings,
        EnablePreviewModeBanner: false,
        // Required in the UI.
        FeedbackEmail: "mattermost-notifications@example.org",
        // Required in the UI.
        FeedbackName: "Mattermost",
      },
      SupportSettings: {
        ...currentConfig.SupportSettings,
        // Required in the UI.
        SupportEmail: "mattermost-support@example.org",
      },
    },
  });
  console.log(`Disabled: ${styleText("green", "email notification banner")}`);
});

chatTest("enable channel deletion by api", async ({ request }) => {
  const systemApi = new SystemApi(
    new ApiConfiguration(
      {
        login_id: ADMIN_DATA.email,
        password: ADMIN_DATA.password,
      },
      request
    )
  );
  const currentConfig = await systemApi.getConfig();
  if (currentConfig.ServiceSettings.EnableAPIChannelDeletion) {
    console.log(styleText("gray", "API channel deletion is enabled already"));
    return;
  }
  await systemApi.updateConfig({
    body: {
      ...currentConfig,
      ServiceSettings: {
        ...currentConfig.ServiceSettings,
        EnableAPIChannelDeletion: true,
      },
    },
  });
  console.log(`Enabled: ${styleText("green", "api channel deletion")}`);
});
