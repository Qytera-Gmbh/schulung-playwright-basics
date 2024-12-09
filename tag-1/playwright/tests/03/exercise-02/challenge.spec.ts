import { expect, test } from "@playwright/test";
import { InvitationCard } from "./invitation-card";
import { InvitationPreviewModal } from "./invitation-preview-modal";

test.describe("Create invitation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://party-planner.qtaf.org");
  });

  test("[03][02] Create invitation", async ({ page }) => {
    const invitationCard = new InvitationCard(page);
    await invitationCard.getInputMail().fill("john.doe@example.org");
    await invitationCard.getInputName().fill("John Doe");
    await invitationCard.getInputCity().fill("Big City");
    await invitationCard.getInputStreet().fill("Roosevelt Road");
    await invitationCard.getInputStreetnumber().fill("52");
    await invitationCard.getButtonPreview().click();

    const modal = new InvitationPreviewModal(page);
    await Promise.all([
      expect.soft(modal.getHostName()).toHaveText("Name: John Doe"),
      expect.soft(modal.getHostMail()).toHaveText("Contact: john.doe@example.org"),
      expect.soft(modal.getCity()).toHaveText("Big City"),
      expect.soft(modal.getStreet()).toHaveText("Roosevelt Road"),
      expect.soft(modal.getStreetnumber()).toHaveText("52"),
    ]);
  });
});
