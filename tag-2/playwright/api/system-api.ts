import { BaseApi } from "../api/base-api";
import { ServerConfiguration } from "./shared/system-model";
import { User } from "./shared/user-model";

/**
 * General endpoints for interacting with the server, such as configuration and logging.
 *
 * @see https://api.mattermost.com/#tag/system
 */
export class SystemApi extends BaseApi {
  /**
   * Retrieve the current server configuration.
   *
   * @returns the server configuration
   *
   * @see https://api.mattermost.com/#tag/system/operation/GetConfig
   */
  public async getConfig(): Promise<ServerConfiguration> {
    return await this.get(200, "/api/v4/config", {
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * Submit a new configuration for the server to use. As of server version 4.8, the
   * `PluginSettings.EnableUploads` setting cannot be modified by this endpoint. Note that the
   * parameters that aren't set in the configuration that you provide will be reset to default
   * values. Therefore, if you want to change a configuration parameter and leave the other ones
   * unchanged, you need to get the existing configuration first, change the field that you want,
   * then put that new configuration.
   *
   * @param parameters request parameters
   * @returns the user
   *
   * @see https://api.mattermost.com/#tag/system/operation/UpdateConfig
   */
  public async updateConfig(parameters: {
    /**
     * The new server configuration.
     */
    body: ServerConfiguration;
  }): Promise<User> {
    return await this.put(200, "/api/v4/config/patch", {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }

  /**
   * ***Warning**: this API endpoint is not documented, it was pulled from a browser's network
   * trace. It may break anytime.*
   *
   * Completes the onboarding in a fresh installation where the admin can choose which plugins to
   * install.
   *
   * @param parameters request parameters
   */
  public async completeOnboarding(parameters: {
    body: {
      install_plugins: [];
      /**
       * The organization name (is this the team name?)
       */
      organization: string;
    };
  }): Promise<void> {
    await this.post(200, "/api/v4/system/onboarding/complete", {
      data: parameters.body,
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }
}
