import { expect, test } from "@playwright/test";
import { PartyPlannerPage } from "page-objects/party-planner-page";
import { CatererCard } from "./caterer-card";

const CATERERS = [
  {
    name: "Platter Perfectionists",
    email: "platters@example.com",
    description:
      "We specialize in crafting beautifully curated platters that turn every meal into a memorable experience. From mouth-watering appetizers to decadent desserts, our goal is to bring flavor, flair, and a touch of perfection to your table!",
  },
  {
    name: "Munch Masters",
    email: "masters@example.com",
    description:
      "Your go-to team for delicious bites and unforgettable feasts. With flavors that satisfy and presentations that impress, we\u2019re here to make every munch a moment to remember!",
  },
  {
    name: "Banana Buffets",
    email: "banana@example.com",
    description:
      "We bring fun, flavor, and a touch of the unexpected to every spread, with dishes that are as lively as they are delicious. Whether you\u2019re after tropical vibes or classic comfort, we\u2019ve got you covered with a buffet that\u2019s truly a-peel-ing!",
  },
];

test.describe("Check caterers", () => {
  test.beforeEach(async ({ page }) => {
    const partyPlannerPage = new PartyPlannerPage(page);
    await partyPlannerPage.open();
  });

  for (const caterer of CATERERS) {
    test(`[03][01] Select caterer: ${caterer.email}`, async ({ page }) => {
      const catererCard = new CatererCard(page);
      await catererCard.getRadio({ name: caterer.name }).check();
      await expect(catererCard.getInfo().name).toHaveText(caterer.name);
      await expect(catererCard.getInfo().description).toHaveText(
        caterer.description
      );
    });
  }
});
