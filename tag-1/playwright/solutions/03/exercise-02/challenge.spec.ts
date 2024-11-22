import { expect, test } from "@playwright/test";
import { InvitationCard } from "./invitation-card";
import { InvitationPreviewModal } from "./invitation-preview-modal";

test.describe("Create invitation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://party-planner.qtaf.org");
  });

  test("[03][02] Create invitation", async ({ page }) => {
    const invitationCard = new InvitationCard(page);
    await invitationCard
      .inputFieldEMailOrganizer()
      .fill("john.doe@example.org");
    await invitationCard.inputFieldNameOrganizer().fill("John Doe");
    await invitationCard.mainCityName().fill("Big City");
    await invitationCard.mainStreetBoulevard().fill("Roosevelt Road");
    await invitationCard.mainStreetBoulevardNumber().fill("52");
    await invitationCard.submitButtonPreview().click();

    const modal = new InvitationPreviewModal(page);
    await Promise.all([
      expect.soft(modal.hostName()).toHaveText("Name: John Doe"),
      expect.soft(modal.hostMail()).toHaveText("Contact: john.doe@example.org"),
      expect.soft(modal.whenWhereCity()).toHaveText("Big City"),
      expect.soft(modal.whenWhereStreet()).toHaveText("Roosevelt Road"),
      expect.soft(modal.whenWhereStreetNumber()).toHaveText("52"),
    ]);
  });
});
