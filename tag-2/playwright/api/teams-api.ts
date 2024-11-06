import { BaseApi } from "playwright/api/base-api";
import { Paginated } from "./shared/base-model";
import { Team, TeamMember } from "./shared/team-model";

/**
 * Endpoints for creating, getting and interacting with teams.
 *
 * @see https://api.mattermost.com/#tag/teams
 */
export class TeamsApi extends BaseApi {
  /**
   * Create a new team on the system.
   *
   * @param parameters request parameters
   *
   * @see https://api.mattermost.com/#tag/teams/operation/CreateTeam
   */
  public async createTeam(parameters: {
    /**
     * The new team.
     */
    body: Pick<Team, "display_name" | "name" | "type">;
  }): Promise<Team> {
    return await this.post(201, "/api/v4/teams", {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * Get a team based on provided name string.
   *
   * @param parameters request parameters
   * @returns the team
   *
   * @see https://api.mattermost.com/#tag/teams/operation/GetTeamByName
   */
  public async getTeamByName(parameters: {
    path: {
      /**
       * The team name.
       */
      name: string;
    };
  }): Promise<Team> {
    return await this.get(200, `/api/v4/teams/name/${parameters.path.name}`, {
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * For regular users only returns open teams. Users with the `manage_system` permission will
   * return teams regardless of type. The result is based on query string parameters - `page` and
   * `per_page`.
   *
   * @param parameters request parameters
   * @returns a list of teams
   *
   * @see https://api.mattermost.com/#tag/teams/operation/GetAllTeams
   */
  public async *getAllTeams(parameters?: {
    query?: Paginated<{
      /**
       * If set to true, teams which are part of a data retention policy will be excluded. The
       * `sysconsole_read_compliance` permission is required to use this parameter.
       *
       * @defaultValue false
       */
      exclude_policy_constrained?: boolean;
      /**
       * Appends a total count of returned teams inside the response object
       *
       * @example
       *
       * ```ts
       * { "teams": [], "total_count" : 0 }.
       * ```
       *
       * @defaultValue false
       */
      include_total_count?: boolean;
    }>;
  }): AsyncGenerator<Team> {
    for (let i = parameters?.query?.page ?? 0; i < Number.MAX_SAFE_INTEGER; i++) {
      const page: Team[] = await this.get(200, "/api/v4/teams", {
        headers: { ...(await this.getAuthorizationHeader()) },
        params: {
          ...parameters?.query,
          page: i,
        },
      });
      if (page.length === 0) {
        return;
      }
      for (const team of page) {
        yield team;
      }
    }
  }

  /**
   * Add user to the team by `user_id`.
   *
   * @param parameters request parameters
   *
   * @see https://api.mattermost.com/#tag/teams/operation/AddTeamMember
   */
  public async addTeamMember(parameters: {
    /**
     * The new team.
     */
    body: {
      /**
       * The ID of the target team.
       */
      team_id: string;
      /**
       * The ID of the user.
       */
      user_id: string;
    };
    path: {
      /**
       * Team GUID.
       */
      team_id: string;
    };
  }): Promise<Team> {
    return await this.post(201, `/api/v4/teams/${parameters.path.team_id}/members`, {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * Get a page team members list based on query string parameters - team id, page and per page.
   *
   * @param parameters request parameters
   * @returns a list of team members
   *
   * @see https://api.mattermost.com/#tag/teams/operation/GetTeamMembers
   */
  public async *getTeamMembers(parameters: {
    path: {
      /**
       * Team GUID.
       */
      team_id: string;
    };
    query?: Paginated<{
      /**
       * Excludes deleted users from the results.
       *
       * @defaultValue false
       */
      exclude_deleted_users?: boolean;
      /**
       * To sort by Username, set to `Username`, otherwise sort is by `UserID`.
       *
       * @defaultValue ""
       */
      sort?: string;
    }>;
  }): AsyncGenerator<TeamMember> {
    for (let i = parameters.query?.page ?? 0; i < Number.MAX_SAFE_INTEGER; i++) {
      const page: TeamMember[] = await this.get(
        200,
        `/api/v4/teams/${parameters.path.team_id}/members`,
        {
          headers: { ...(await this.getAuthorizationHeader()) },
          params: {
            ...parameters.query,
            page: i,
          },
        }
      );
      if (page.length === 0) {
        return;
      }
      for (const member of page) {
        yield member;
      }
    }
  }
}
