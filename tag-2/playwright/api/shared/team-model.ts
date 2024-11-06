/**
 * Models a Mattermost team.
 *
 * @see https://api.mattermost.com/#tag/teams/operation/GetTeam
 */
export interface Team {
  allow_open_invite: boolean;
  allowed_domains: string;
  /**
   * The time in milliseconds a team was created.
   */
  create_at: number;
  /**
   * The time in milliseconds a team was deleted.
   */
  delete_at: number;
  description: string;
  /**
   * Non-unique UI name for the team.
   */
  display_name: string;
  email: string;
  id: string;
  invite_id: string;
  /**
   * Unique handler for a team, will be present in the team URL.
   */
  name: string;
  /**
   * The data retention policy to which this team has been assigned. If no such policy exists, or
   * the caller does not have the `sysconsole_read_compliance_data_retention` permission, this field
   * will be null.
   */
  policy_id: string;
  /**
   * `O` for open, `I` for invite only.
   */
  type: "I" | "O";
  /**
   * The time in milliseconds a team was last updated
   */
  update_at: number;
}

export interface TeamMember {
  /**
   * The time in milliseconds that this team member was deleted.
   */
  delete_at: number;
  /**
   * The list of roles explicitly assigned to this team member, as a space separated list of role
   * names. This list does not include any roles granted implicitly through permissions schemes.
   */
  explicit_roles: string;
  /**
   * The complete list of roles assigned to this team member, as a space-separated list of role
   * names, including any roles granted implicitly through permissions schemes.
   */
  roles: string;
  /**
   * Whether this team member holds the default admin role defined by the team's permissions scheme.
   */
  scheme_admin: boolean;
  /**
   * Whether this team member holds the default user role defined by the team's permissions scheme.
   */
  scheme_user: boolean;
  /**
   * The ID of the team this member belongs to.
   */
  team_id: string;
  /**
   * The ID of the user this member relates to.
   */
  user_id: string;
}
