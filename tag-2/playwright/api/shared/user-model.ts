/**
 * Models a Mattermost user.
 *
 * @see https://api.mattermost.com/#tag/teams/operation/GetTeam
 */
export interface User {
  /**
   * Service-specific authentication data, such as email address.
   */
  auth_data?: string;
  /**
   * The authentication service, one of `email`, `gitlab`, `ldap`, `saml`, `office365`, `google`, and ` `.
   */
  auth_service?: "" | "email" | "gitlab" | "google" | "ldap" | "office365" | "saml";
  /**
   * The time in milliseconds a user was created.
   */
  create_at: number;
  /**
   * The time in milliseconds a user was deleted.
   */
  delete_at: number;
  email: string;
  email_verified: boolean;
  failed_attempts: number;
  first_name: string;
  id: string;
  last_name: string;
  last_password_update: number;
  last_picture_update: number;
  locale: string;
  mfa_active: boolean;
  nickname: string;
  notify_props: {
    /**
     * Set to `true` to enable channel-wide notifications (_@channel_, _@all_, etc.), `false` to disable.
     *
     * @defaultValue true
     */
    channel: string;
    /**
     * Set to `all` to receive desktop notifications for all activity, `mention` for mentions and
     * direct messages only, and `none` to disable.
     *
     * @defaultValue `mention`
     */
    desktop: string;
    /**
     * Set to `true` to enable sound on desktop notifications, `false` to disable.
     *
     * @defaultValue true
     */
    desktop_sound: string;
    /**
     * Set to `true` to enable email notifications, `false` to disable.
     *
     * @defaultValue true
     */
    email: string;
    /**
     * Set to `true` to enable mentions for first name.
     *
     * @defaultValue true if a first name is set, false otherwise
     */
    first_name: string;
    /**
     * A comma-separated list of words to count as mentions.
     *
     * @defaultValue `username,@username`
     */
    mention_keys: string;
    /**
     * Set to `all` to receive push notifications for all activity, `mention` for mentions and
     * direct messages only, and `none` to disable.
     *
     * @defaultValue `mention`
     */
    push: "all" | "mention" | "none";
  };
  /**
   * The password used for email authentication.
   */
  password: string;
  position: string;
  props: object;
  roles: string;
  /**
   * The time in milliseconds the user accepted the terms of service.
   */
  terms_of_service_create_at: number;
  /**
   * ID of accepted terms of service, if any. This field is not present if empty.
   */
  terms_of_service_id: string;
  timezone: {
    /**
     * Set to `true` to use the browser/system timezone, `false` to set manually.
     *
     * @defaultValue true
     */
    automaticTimezone: string;
    /**
     * Value when setting manually the timezone, i.e. `Europe/Berlin`.
     */
    manualTimezone: string;
    /**
     * This value is set automatically when the `useAutomaticTimezone` is set to `true`.
     */
    useAutomaticTimezone: boolean;
  };
  /**
   * The time in milliseconds a user was last updated.
   */
  update_at: number;
  username: string;
}

/**
 * Models a Mattermost user access token.
 *
 * @see https://api.mattermost.com/#tag/users/operation/GetUserAccessToken
 */
export interface UserAccessToken {
  /**
   * A description of the token usage.
   */
  description: string;
  /**
   * Unique identifier for the token.
   */
  id: string;
  /**
   * The token used for authentication.
   */
  token: string;
  /**
   * The user the token authenticates for.
   */
  user_id: string;
}
