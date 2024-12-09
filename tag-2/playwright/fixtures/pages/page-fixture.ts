import test, { Page } from "@playwright/test";
import { LandingPage } from "../../pages/landing/landing-page";
import { LoginPage } from "../../pages/login/login-page";
import { Editor } from "../../pages/main/channel/editor/editor-page";
import { ChannelHeader } from "../../pages/main/channel/header/channel-header-page";
import { PostList } from "../../pages/main/channel/posts/post-list-page";
import { MainPage } from "../../pages/main/main-page";
import { CreateChannelModal } from "../../pages/main/modals/create-channel-modal-page";
import { CreateChannelMenu } from "../../pages/main/sidebar/create-channel-menu-page";
import { Sidebar } from "../../pages/main/sidebar/sidebar-page";
import { PageObject } from "../../pages/page";

type AvailableFixtures = Parameters<(typeof test)["extend"]>[0];

const PAGE_UTILITY = ({}: AvailableFixtures) => {
  return function (page: Page) {
    // We use getters here for lazy evaluation. There's no need to create all page objects if we're
    // just interested in a single one.
    return {
      get analysis() {
        return {
          get telemetry() {
            return {
              get sensor() {
                return {
                  check: {
                    alarmsRecorded: async (alarms: []) => {
                      await new Promise((resolve) => {
                        resolve(alarms);
                      });
                    },
                  },
                };
              },
            };
          },
        };
      },
      get landing() {
        return new LandingPage(page);
      },
      get login() {
        return new LoginPage(page);
      },
      get machine() {
        return {
          get car() {
            return {
              get alarm() {
                return {
                  check: {
                    alarmsPresent: async (iconType: ("error" | "warning")[]) => {
                      await new Promise((resolve) => {
                        resolve(iconType);
                      });
                    },
                  },
                  do: {
                    switchToAnalysis: async () => {
                      // ...
                    },
                  },
                };
              },
            };
          },
          open: async (car: string, plate: string) => {
            await new Promise((resolve) => {
              resolve([car, plate]);
            });
          },
        };
      },
      get main() {
        return merge(new MainPage(page), {
          get editor() {
            return new Editor(page);
          },
          get header() {
            return new ChannelHeader(page);
          },
          get modal() {
            return {
              get createNewChannel() {
                return new CreateChannelModal(page);
              },
            };
          },
          get posts() {
            return new PostList(page);
          },
          get sidebar() {
            return merge(new Sidebar(page), {
              get menu() {
                return {
                  get createChannel() {
                    return new CreateChannelMenu(page);
                  },
                };
              },
            });
          },
        });
      },
    };
  };
};

export const utilityTest = test.extend<{
  on: ReturnType<typeof PAGE_UTILITY>;
}>({
  on: async ({}, use) => {
    await use((page: Page) => {
      return PAGE_UTILITY({})(page);
    });
  },
});

/**
 * Merges a child object into the parent page object. This circumvents prototyping issues which
 * standard object spreading introduces when objects have functions.
 *
 * @example
 *
 * ```ts
 * class Class {
 *   private readonly greeting: string;
 *   constructor(greeting: string) {
 *     this.greeting = greeting;
 *   }
 * }
 *
 * const instance = new Class("hi");
 *
 * const c = {
 *   a: 42,
 *   ...instance
 * };
 * console.log(c.a) // 42
 * console.log(c.getGreeting()) // Property 'getGreeting' does not exist on type '{ a: number; }'
 *
 * const c = merge(instance, {
 *   a: 42
 * };
 * console.log(c.a) // 42
 * console.log(c.getGreeting()) // "hi"
 * ```
 *
 * @param pageObject
 * @param child
 * @returns the merged page object
 *
 * @see https://stackoverflow.com/a/58058608
 */
function merge<PageObjectType extends PageObject, O extends object>(
  parent: PageObjectType,
  child: O
): PageObjectType & O {
  return Object.assign(parent, child);
}
