import { BaseApi } from "../api/base-api";
import { Paginated } from "./shared/base-model";
import { ChannelPosts, Post } from "./shared/post-model";

/**
 * Endpoints for creating, getting and interacting with posts.
 *
 * @see https://api.mattermost.com/#tag/posts
 */
export class PostsApi extends BaseApi {
  /**
   * Get a page of posts in a channel. Use the query parameters to modify the behaviour of this
   * endpoint. The parameter since must not be used with any of `before`, `after`, `page`, and
   * `per_page` parameters. If `since` is used, it will always return all posts modified since that
   * time, ordered by their create time limited till 1000. A caveat with this parameter is that
   * there is no guarantee that the returned posts will be consecutive. It is left to the clients
   * to maintain state and fill any missing holes in the post order.
   *
   * @param parameters request parameters
   * @returns a list of posts
   *
   * @see https://api.mattermost.com/#tag/posts/operation/GetPostsForChannel
   */
  public async *getPostsForChannel(parameters: {
    path: {
      /**
       * The channel ID to get the posts for.
       */
      channel_id: string;
    };
    query?: Paginated<{
      /**
       * A post id to select the posts that came after this one.
       */
      after?: number;
      /**
       * A post id to select the posts that came before this one.
       */
      before?: number;
      /**
       * Whether to include deleted posts or not. Must have system admin permissions.
       *
       * @defaultValue false
       */
      include_deleted?: boolean;
      /**
       * Provide a non-zero value in Unix time milliseconds to select posts modified after that
       * time.
       */
      since?: number;
    }>;
  }): AsyncGenerator<Post> {
    for (let i = parameters.query?.page ?? 0; i < Number.MAX_SAFE_INTEGER; i++) {
      const page: ChannelPosts = await this.get(
        200,
        `/api/v4/channels/${parameters.path.channel_id}/posts`,
        {
          headers: { ...(await this.getAuthorizationHeader()) },
          params: {
            ...parameters.query,
            page: i,
          },
        }
      );
      for (const post of Object.values(page.posts)) {
        yield post;
      }
      if (!page.has_next) {
        return;
      }
    }
  }
  /**
   * Soft deletes a post, by marking the post as deleted in the database. Soft deleted posts will
   * not be returned in post queries.
   *
   * @param parameters request parameters
   *
   * @see https://api.mattermost.com/#tag/posts/operation/DeletePost
   */
  public async deletePost(parameters: {
    path: {
      /**
       * ID of the post to delete
       */
      post_id: string;
    };
  }): Promise<void> {
    await this.delete(200, `/api/v4/posts/${parameters.path.post_id}`, {
      headers: { ...(await this.getAuthorizationHeader()) },
    });
  }
}
