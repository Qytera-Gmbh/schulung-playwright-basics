import { Page } from "@playwright/test";
import { PageObject } from "playwright/pages/page";
import { PostListItem } from "./post-list-item-page";

export class PostList extends PageObject {
  constructor(page: Page) {
    super(page, page.locator("#postListContent"));
  }

  public getPost(filter?: {
    author?: string;
    /**
     *
     */
    first?: boolean;
    /**
     *
     */
    last?: boolean;
  }) {
    let locator = this.root.getByRole("listitem");
    if (filter?.author) {
      locator = locator.filter({
        has: this.page.getByRole("button").filter({ hasText: filter.author }),
      });
    }
    if (filter?.first) {
      locator = locator.first();
    }
    if (filter?.last) {
      locator = locator.last();
    }
    return new PostListItem(this.page, locator);
  }
}
