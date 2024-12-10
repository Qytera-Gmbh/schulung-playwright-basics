/**
 * @see https://api.mattermost.com/#tag/posts/operation/GetPost
 */
export interface Post {
  channel_id: string;
  /**
   * The time in milliseconds a post was created.
   */
  create_at: number;
  /**
   * The time in milliseconds a post was deleted.
   */
  delete_at: number;
  edit_at: number;
  file_ids: string[];
  hashtag: string;
  id: string;
  message: string;
  /**
   * Additional information used to display a post.
   */
  metadata: unknown;
  original_id: string;
  pending_post_id: string;
  props: unknown;
  root_id: string;
  type: string;
  /**
   * The time in milliseconds a post was last updated
   */
  update_at: number;
  user_id: string;
}

/**
 * @see https://api.mattermost.com/#tag/posts/operation/GetPostsForChannel
 */
export interface ChannelPosts {
  /**
   * Whether there are more items after this page.
   */
  has_next: boolean;
  /**
   * The ID of next post. Not omitted when empty or not relevant.
   */
  next_post_id: string;
  order: string[];
  posts: Record<string, Post>;
  /**
   * The ID of previous post. Not omitted when empty or not relevant.
   */
  prev_post_id: string;
}
