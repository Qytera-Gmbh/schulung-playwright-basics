/**
 * Models a Mattermost channel.
 *
 * @see https://api.mattermost.com/#tag/channels/operation/GetChannel
 */
export interface Channel {
  /**
   * The time in milliseconds a channel was created
   */
  create_at: number;
  creator_id: string;
  /**
   * The time in milliseconds a channel was deleted
   */
  delete_at: number;
  display_name: string;
  header: string;
  id: string;
  /**
   * The time in milliseconds of the last post of a channel
   */
  last_post_at: number;
  name: string;
  /**
   * The data retention policy to which this team has been assigned. If no such policy exists, or
   * the caller does not have the sysconsole_read_compliance_data_retention permission, this field
   * will be null.
   */
  policy_id: string;
  purpose: string;
  /**
   * The display name of the team to which this channel belongs.
   */
  team_display_name: string;
  team_id: string;
  /**
   * The name of the team to which this channel belongs.
   */
  team_name: string;
  /**
   * The time at which the team to which this channel belongs was last updated.
   */
  team_update_at: number;
  total_msg_count: number;
  type: string;
  /**
   * The time in milliseconds a channel was last updated
   */
  update_at: number;
}
