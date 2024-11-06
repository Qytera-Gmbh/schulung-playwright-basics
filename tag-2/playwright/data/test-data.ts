import { getChannelData } from "./channels/channel-data";
import { getTeamData } from "./teams/team-data";
import { getUserData } from "./users/user-data";

const TEST_DATA = {
  ["1"]: [getUserData("jane@example.org"), getUserData("john@example.org")],
  ["2"]: [getChannelData("off-topic"), getChannelData("town-square")],
  ["3"]: [
    {
      mode: "public",
      name: "Test Channel",
      purpose: "This is a test channel",
      team: getTeamData("playwright"),
      user: getUserData("jane@example.org"),
    },
    {
      mode: "public",
      name: "Emoji Test Channel",
      purpose: "This is a test channel with an emoji in its description 🙋‍♀️",
      team: getTeamData("playwright"),
      user: getUserData("jane@example.org"),
    },
  ],
  ["5"]: [
    {
      author: getUserData("jane@example.org"),
      channel: getChannelData("town-square"),
      description: "text only",
      team: getTeamData("playwright"),
      text: "this is an automated message",
    },
    {
      author: getUserData("jane@example.org"),
      channel: getChannelData("town-square"),
      description: "text and emoji",
      team: getTeamData("playwright"),
      text: "this is an automated message with an emoji 😎",
    },
  ],
} as const;

type TestData = typeof TEST_DATA;

export function getTestData<K extends keyof TestData>(id: K): TestData[K] {
  return TEST_DATA[id];
}
