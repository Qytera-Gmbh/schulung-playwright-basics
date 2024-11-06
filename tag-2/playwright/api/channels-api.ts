import { BaseApi } from "playwright/api/base-api";
import { Paginated } from "./shared/base-model";
import { Channel } from "./shared/channel-model";
import { ServerConfiguration } from "./shared/system-model";

/**
 * Endpoints for creating, getting and interacting with channels.
 *
 * @see https://api.mattermost.com/#tag/channels
 */
export class ChannelsApi extends BaseApi {
  /**
   * Archives a channel. This will set the `deleteAt` to the current timestamp in the database. Soft
   * deleted channels may not be accessible in the user interface. They can be viewed and unarchived
   * in the System Console > User Management > Channels based on your license. Direct and group
   * message channels cannot be deleted.
   *
   * As of server version 5.28, optionally use the `permanent=true` query parameter to permanently
   * delete the channel for compliance reasons. To use this feature
   * `ServiceSettings.EnableAPIChannelDeletion` must be set to `true` in the server's configuration.
   * If you permanently delete a channel this action is not recoverable outside of a database
   * backup.
   *
   * @param parameters request parameters
   *
   * @see https://api.mattermost.com/#tag/channels/operation/DeleteChannel
   */
  public async deleteChannel(parameters: {
    path: {
      /**
       * Channel GUID.
       */
      channel_id: string;
    };
    query?: {
      permanent?: boolean;
    };
  }): Promise<ServerConfiguration> {
    return await this.delete(200, `/api/v4/channels/${parameters.path.channel_id}`, {
      headers: { ...(await this.getAuthorizationHeader()) },
      params: parameters.query,
    });
  }

  /**
   * Gets a channel from the provided team name and channel name strings.
   *
   * @param parameters request parameters
   * @returns the channel
   *
   * @see https://api.mattermost.com/#tag/channels/operation/GetChannelByNameForTeamName
   */
  public async getChannelByNameForTeamName(parameters: {
    path: {
      /**
       * Channel name.
       */
      channel_name: string;
      /**
       * Team name.
       */
      team_name: string;
    };
    query?: {
      /**
       * Defines if deleted channels should be returned or not.
       *
       * @defaultValue false
       */
      include_deleted?: boolean;
    };
  }): Promise<Channel> {
    return await this.get(
      200,
      `/api/v4/teams/name/${parameters.path.team_name}/channels/name/${parameters.path.channel_name}`,
      {
        headers: { ...(await this.getAuthorizationHeader()) },
        params: parameters.query,
      }
    );
  }

  /**
   * Get all the channels on a team for a user.
   *
   * @param parameters request parameters
   * @returns the channels
   *
   * @see https://api.mattermost.com/#tag/channels/operation/GetChannelsForTeamForUser
   */
  public async getChannelsForTeamForUser(parameters: {
    path: {
      /**
       * Team GUID.
       */
      team_id: string;
      /**
       * User GUID.
       */
      user_id: string;
    };
    query?: {
      /**
       * Defines if deleted channels should be returned or not.
       *
       * @defaultValue false
       */
      include_deleted?: boolean;
      /**
       * Filters the deleted channels by this time in epoch format. Does not have any effect if
       * `include_deleted` is set to false.
       *
       * @defaultValue 0
       */
      last_delete_at?: number;
    };
  }): Promise<Channel[]> {
    return await this.get(200, `/api/v4/users/${parameters.path.user_id}/channels`, {
      headers: { ...(await this.getAuthorizationHeader()) },
      params: parameters.query,
    });
  }

  /**
   * Returns a list of all channels.
   *
   * @param parameters request parameters
   * @returns a list of channels
   *
   * @see https://api.mattermost.com/#tag/channels/operation/GetAllChannels
   */
  public async *getAllChannels(parameters?: {
    query?: Paginated<{
      /**
       * Whether to exclude default channels (ex Town Square, Off-Topic) from the results.
       *
       * @defaultValue false
       */
      exclude_default_channels?: boolean;
      /**
       * If set to true, channels which are part of a data retention policy will be excluded. The
       * `sysconsole_read_compliance` permission is required to use this parameter.
       *
       * @defaultValue false
       */
      exclude_policy_constrained?: boolean;
      /**
       * Include channels that have been archived. This correlates to the `DeleteAt` flag being set
       * in the database.
       *
       * @defaultValue false
       */
      include_deleted?: boolean;
      /**
       * Appends a total count of returned channels inside the response object.
       *
       * @example
       *
       * ```ts
       * { "channels": [], "total_count" : 0 }.
       * ```
       *
       *
       * @defaultValue false
       */
      include_total_count?: boolean;
      /**
       * A group id to exclude channels that are associated with that group via GroupChannel
       * records. This can also be left blank with `not_associated_to_group=`.
       */
      not_associated_to_group?: boolean;
    }>;
  }): AsyncGenerator<Channel> {
    for (let i = parameters?.query?.page ?? 0; i < Number.MAX_SAFE_INTEGER; i++) {
      const page: Channel[] = await this.get(200, "/api/v4/channels", {
        headers: { ...(await this.getAuthorizationHeader()) },
        params: {
          ...parameters?.query,
          page: i,
        },
      });
      if (page.length === 0) {
        return;
      }
      for (const channel of page) {
        yield channel;
      }
    }
  }
}
