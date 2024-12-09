import { Team } from "../../api/shared/team-model";

export function getTeamData(team: "playwright"): Pick<Team, "display_name" | "name" | "type"> {
  switch (team) {
    case "playwright":
      return { display_name: "Playwright", name: "playwright", type: "O" };
  }
}
