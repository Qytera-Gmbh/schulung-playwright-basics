import { Channel } from "../../api/shared/channel-model";

export function getChannelData(
  channel: "off-topic" | "town-square"
): Pick<Channel, "display_name" | "name"> {
  switch (channel) {
    case "town-square":
      return { display_name: "Town Square", name: "town-square" };
    case "off-topic":
      return { display_name: "Off-Topic", name: "off-topic" };
  }
}
