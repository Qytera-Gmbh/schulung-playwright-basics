/**
 * The pagination parameters of Mattermost.
 *
 * @see https://api.mattermost.com/#tag/schema
 */
export type Paginated<T = unknown> = T & {
  /**
   * The page to select.
   *
   * @defaultValue 0
   */
  page?: number;
  /**
   * The number of items per page. The maximum number of items returned per request is capped at
   * 200. If it exceeds 200, the list will be silently truncated to 200 items.
   *
   * @defaultValue 60
   */
  per_page?: number;
};
