import { APIRequestContext, APIResponse } from "@playwright/test";
import { styleText } from "node:util";

export class BaseApi {
  private readonly configuration: ApiConfiguration;

  /**
   * Constructs a new API client. The provided configuration will be used to extract authentication
   * and session data if needed.
   *
   * @param configuration the configuration
   */
  constructor(configuration: ApiConfiguration) {
    this.configuration = configuration;
  }

  /**
   * Performs a GET request.
   *
   * @param expectedStatus the expected HTTP status of the response
   * @param parameters  the request's parameters
   * @returns the response data
   */
  protected async get<T>(
    expectedStatus: number,
    ...parameters: Parameters<APIRequestContext["get"]>
  ): Promise<T> {
    const response = await this.configuration.request.get(...parameters);
    return await this.checkStatus("GET", parameters[0], expectedStatus, response, parameters[1]);
  }

  /**
   * Performs a POST request.
   *
   * @param expectedStatus the expected HTTP status of the response
   * @param parameters  the request's parameters
   * @returns the response data
   */
  protected async post<T>(
    expectedStatus: number,
    ...parameters: Parameters<APIRequestContext["post"]>
  ): Promise<T> {
    const response = await this.configuration.request.post(...parameters);
    return await this.checkStatus("POST", parameters[0], expectedStatus, response, parameters[1]);
  }

  /**
   * Performs a PUT request.
   *
   * @param expectedStatus the expected HTTP status of the response
   * @param parameters  the request's parameters
   * @returns the response data
   */
  protected async put<T>(
    expectedStatus: number,
    ...parameters: Parameters<APIRequestContext["put"]>
  ): Promise<T> {
    const response = await this.configuration.request.put(...parameters);
    return await this.checkStatus("PUT", parameters[0], expectedStatus, response, parameters[1]);
  }

  /**
   * Performs a DELETE request.
   *
   * @param expectedStatus the expected HTTP status of the response
   * @param parameters  the request's parameters
   * @returns the response data
   */
  protected async delete<T>(
    expectedStatus: number,
    ...parameters: Parameters<APIRequestContext["delete"]>
  ): Promise<T> {
    const response = await this.configuration.request.delete(...parameters);
    return await this.checkStatus("DELETE", parameters[0], expectedStatus, response, parameters[1]);
  }

  /**
   * Returns the authorization header for this API.
   *
   * @returns the authorization header value
   */
  protected async getAuthorizationHeader() {
    return await this.configuration.getAuthorizationHeader();
  }

  private async checkStatus<T>(
    method: string,
    url: string,
    expectedStatus: number,
    response: APIResponse,
    options?:
      | Parameters<APIRequestContext["delete"]>[1]
      | Parameters<APIRequestContext["get"]>[1]
      | Parameters<APIRequestContext["patch"]>[1]
      | Parameters<APIRequestContext["post"]>[1]
      | Parameters<APIRequestContext["put"]>[1]
  ): Promise<T> {
    if (response.status() !== expectedStatus) {
      const lines = [
        "API request failed with unexpected status",
        "",
        `  Expected: ${styleText("green", expectedStatus.toString())}`,
        `  Received: ${styleText("red", response.status().toString())}`,
        "",
        `  Request method: ${styleText("cyan", method)}`,
        `  Request URL: ${styleText("cyan", url)}`,
      ];
      if (options?.params) {
        lines.push(
          `  Request parameters: ${styleText(
            ["cyan"],
            JSON.stringify(options.params, null, 2).replaceAll("\n", "\n  ")
          )}`
        );
      }
      if (options?.data) {
        lines.push(
          `  Request body: ${styleText(
            ["cyan"],
            JSON.stringify(options.data, null, 2).replaceAll("\n", "\n  ")
          )}`
        );
      }
      lines.push("");
      try {
        lines.push(
          `  Response: ${styleText(
            ["red"],
            JSON.stringify(await response.json(), null, 2).replaceAll("\n", "\n  ")
          )}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        lines.push(`  Response: ${styleText("red", await response.text())}`);
      }
      throw new Error(lines.join("\n"));
    }
    // Mattermost always returns JSON data.
    // See: https://api.mattermost.com/#tag/schema
    return await response.json();
  }
}

/**
 * Models a user authentication object.
 *
 * @see https://api.mattermost.com/#tag/users/operation/Login
 */
export interface MattermostCredentials {
  device_id?: string;
  id?: string;
  ldap_only?: true;
  login_id?: string;
  /**
   * The password used for email authentication.
   */
  password?: string;
  token?: string;
}

/**
 * The purpose of the API configuration is to store user credentials and their session so that they
 * can be passed between API classes without requiring re-authentication each time.
 */
export class ApiConfiguration {
  public readonly request: APIRequestContext;
  private readonly credentials: MattermostCredentials;
  private authorizationHeader: { authorization?: string } | undefined;

  /**
   * Constructs a new API configuration using the specified credentials and the given HTTP request
   * context.
   *
   * @param credentials the credentials
   * @param context the API request context
   */
  constructor(credentials: MattermostCredentials, context: APIRequestContext) {
    this.credentials = credentials;
    this.request = context;
  }

  /**
   * Returns the authorization header for this configuration.
   *
   * @returns the authorization header value
   */
  public async getAuthorizationHeader(): Promise<{ authorization?: string }> {
    if (this.authorizationHeader) {
      return this.authorizationHeader;
    }
    // We cannot provide an authorization header for this scenario. Only relevant for the init test
    // phase.
    if (!this.credentials.login_id && !this.credentials.password && !this.credentials.token) {
      return {};
    }
    const token = await this.getToken();
    this.authorizationHeader = { authorization: `Bearer ${token}` };
    return this.authorizationHeader;
  }

  private async getToken() {
    if (this.credentials.token) {
      return this.credentials.token;
    }
    // Acquire new session token. Note: the documentation is wrong, the response status is 200.
    // See: https://api.mattermost.com/#tag/authentication
    const endpoint = "/api/v4/users/login";
    const loginResponse = await this.request.post(endpoint, { data: this.credentials });
    if (loginResponse.status() !== 200) {
      throw new Error(
        `Login response failed with unexpected status: ${styleText(
          ["red"],
          loginResponse.status().toString()
        )}\n\nResponse: ${styleText("red", await loginResponse.text())}`
      );
    }
    if (!("token" in loginResponse.headers())) {
      throw new Error(
        `Failed to extract bearer token from login response headers: ${styleText(
          ["red"],
          JSON.stringify(loginResponse.headers(), null, 2)
        )}`
      );
    }
    return loginResponse.headers().token;
  }
}
