import { BaseApi } from "../api/base-api";
import { Paginated } from "./shared/base-model";
import { User, UserAccessToken } from "./shared/user-model";

/**
 * Endpoints for creating, getting and interacting with users. When using endpoints that require a user id, the string me can be used in place of the user id to indicate the action is to be taken for the logged in user.

 *
 * @see https://api.mattermost.com/#tag/users
 */
export class UsersApi extends BaseApi {
  /**
   * Get users. Based on query string parameters, select users from a team,
   * channel, or select users not in a specific channel. Since server version 4.0, some basic
   * sorting is available using the `sort` query parameter. Sorting is currently only supported when
   * selecting users on a team.
   *
   * @param paramters request parameters
   * @returns a list of users
   *
   * @see https://api.mattermost.com/#tag/users/operation/GetUsers
   */
  public async *getUsers(parameters?: {
    query?: Paginated<{
      /**
       * Whether or not to list only users that are active. This option cannot be used along with the
       * inactive option.
       */
      active?: boolean;
      /**
       * Comma separated string used to filter users based on any of the specified channel roles, can
       * only be used in conjunction with `in_channel`.
       *
       * @example
       *
       * ```ts
       * // Will return users that are only channel users and not admins or guests.
       * {
       *   in_channel: "4eb6axxw7fg3je5iyasnfudc5y",
       *   channel_roles: "channel_user"
       * }
       * ```
       */
      channel_roles?: string;
      /**
       * When used with `not_in_channel` or `not_in_team`, returns only the users that are allowed to
       * join the channel or team based on its group constrains.
       */
      group_constrained?: boolean;
      /**
       * The ID of the channel to get users for.
       */
      in_channel?: string;
      /**
       * The ID of the group to get users for. Must have `manage_system` permission.
       */
      in_group?: string;
      /**
       * The ID of the team to get users for.
       */
      in_team?: string;
      /**
       * Whether or not to list only users that are deactivated. This option cannot be used along with
       * the `active` option.
       */
      inactive?: boolean;
      /**
       * The ID of the channel to exclude users for. Must be used with `in_channel` query parameter.
       */
      not_in_channel?: string;
      /**
       * The ID of the team to exclude users for. Must not be used with `in_team` query parameter.
       */
      not_in_team?: string;
      /**
       * Returns users that have this role.
       */
      role?: string;
      /**
       * Comma separated string used to filter users based on any of the specified system roles.
       *
       * @example
       *
       * ```ts
       * // Will return users that are either system admins or system users.
       * {
       *   roles: "system_admin,system_user"
       * }
       * ```
       */
      roles?: string;
      /**
       * Sort is only available in conjunction with certain options below. The paging parameter is
       * also always available.
       *
       * - `in_team`: Can be ` `, `last_activity_at` or `create_at`. When left blank, sorting is done
       *   by username. Note that when `last_activity_at` is specified, an additional `last_activity_at`
       *   field will be returned in the response packet.
       *
       * - `in_channel`: Can be ` `, `status`. When left blank, sorting is done by username. status
       *   will sort by User's current status (Online, Away, DND, Offline), then by username.
       *
       * - `in_group`: Can be ` `, `display_name`. When left blank, sorting is done by username.
       *   `display_name` will sort alphabetically by user's display name.
       */
      sort?: string;
      /**
       * Comma separated string used to filter users based on any of the specified team roles, can
       * only be used in conjunction with `in_team`.
       *
       * @example
       *
       * ```ts
       * // Will return users that are only team users and not admins or guests.
       * {
       *   in_team: "4eb6axxw7fg3je5iyasnfudc5y",
       *   team_roles: "team_user"
       * }
       * ```
       */
      team_roles?: string;
      /**
       * Whether or not to list users that are not on any team. This option takes precendence over
       * `in_team`, `in_channel`, and `not_in_channel`.
       */
      without_team?: boolean;
    }>;
  }): AsyncGenerator<User> {
    for (let i = parameters?.query?.page ?? 0; i < Number.MAX_SAFE_INTEGER; i++) {
      const page: User[] = await this.get(200, "/api/v4/users", {
        headers: { ...(await this.getAuthorizationHeader()) },
        params: {
          ...parameters?.query,
          page: i,
        },
      });
      if (page.length === 0) {
        return;
      }
      for (const user of page) {
        yield user;
      }
    }
  }

  /**
   * Create a new user on the system. Password is required for email login. For other authentication
   * types such as LDAP or SAML, `auth_data` and `auth_service` fields are required.
   *
   * @param parameters request parameters
   * @returns the created user
   *
   * @see https://api.mattermost.com/#tag/users/operation/CreateUser
   */
  public async createUser(parameters: {
    /**
     * The new user.
     */
    body: Pick<User, "email" | "username"> &
      Partial<
        Pick<
          User,
          | "auth_data"
          | "auth_service"
          | "first_name"
          | "last_name"
          | "locale"
          | "nickname"
          | "notify_props"
          | "password"
          | "position"
          | "props"
          | "timezone"
        >
      >;
    query?: {
      /**
       * Token id from an invitation link.
       */
      iid: string;
      /**
       * Token id from an email invitation.
       */
      t: string;
    };
  }): Promise<User> {
    return await this.post(201, "/api/v4/users", {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
      params: parameters.query,
    });
  }

  /**
   * Get a user object by providing a user email. Sensitive information will be sanitized out.
   *
   * @param parameters request parameters
   * @returns the user
   *
   * @see https://api.mattermost.com/#tag/users/operation/GetUserByEmail
   */
  public async getUserByEmail(parameters: {
    path: {
      /**
       * The user email.
       */
      email: string;
    };
  }): Promise<User> {
    return await this.get(200, `/api/v4/users/email/${parameters.path.email}`, {
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * Generate a user access token that can be used to authenticate with the Mattermost REST API.
   *
   * @param parameters request parameters
   * @returns the access token
   *
   * @see https://api.mattermost.com/#tag/users/operation/CreateUserAccessToken
   */
  public async createUserAccessToken(parameters: {
    body: {
      /**
       * A description of the token usage.
       */
      description: string;
    };
    path: {
      /**
       * User GUID.
       */
      user_id: string;
    };
  }): Promise<UserAccessToken> {
    return await this.post(200, `/api/v4/users/${parameters.path.user_id}/tokens`, {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * Get a list of user access tokens for a user. Does not include the actual authentication tokens.
   * Use query parameters for paging.
   *
   * @param parameters request parameters
   * @returns the access tokens
   *
   * @see https://api.mattermost.com/#tag/users/operation/GetUserAccessTokensForUser
   */
  public async *getUserAccessTokensForUser(parameters: {
    path: {
      /**
       * User GUID.
       */
      user_id: string;
    };
    query?: Paginated;
  }): AsyncGenerator<UserAccessToken> {
    for (let i = parameters.query?.page ?? 0; i < Number.MAX_SAFE_INTEGER; i++) {
      const page: UserAccessToken[] = await this.get(
        200,
        `/api/v4/users/${parameters.path.user_id}/tokens`,
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
      for (const token of page) {
        yield token;
      }
    }
  }

  /**
   * Update a user's password. New password must meet password policy set by server configuration.
   * Current password is required if you're updating your own password.
   *
   * @param parameters request parameters
   *
   * @see https://api.mattermost.com/#tag/users/operation/UpdateUserPassword
   */
  public async updateUserPassword(parameters: {
    body: {
      /**
       * A description of the token usage.
       */
      current_password?: string;
      /**
       * The new password for the user.
       */
      new_password: string;
    };
    path: {
      /**
       * User GUID.
       */
      user_id: string;
    };
  }): Promise<void> {
    await this.put(200, `/api/v4/users/${parameters.path.user_id}/password`, {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * Save a list of the user's preferences.
   *
   * @param parameters request parameters
   *
   * @see https://api.mattermost.com/#tag/preferences/operation/UpdatePreferences
   */
  public async updatePreferences(parameters: {
    body: {
      category: string;
      name: string;
      /**
       * The ID of the user that owns this preference.
       */
      user_id: string;
      value: string;
    }[];
    path: {
      /**
       * User GUID.
       */
      user_id: string;
    };
  }): Promise<void> {
    await this.put(200, `/api/v4/users/${parameters.path.user_id}/preferences`, {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }
}
