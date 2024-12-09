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
    await invitationCard.getColorPickerPrimary().fill("#ffaa00");
    await invitationCard.getColorPickerSecondary().fill("#0033ff");
    await invitationCard.getInputComments().fill("I am looking forward to seeing you!");
    await invitationCard.getButtonPreview().click();

    const modal = new InvitationPreviewModal(page);
    await Promise.all([
      expect.soft(modal.getHostName()).toHaveText("Name: John Doe"),
      expect.soft(modal.getHostMail()).toHaveText("Contact: john.doe@example.org"),
      expect.soft(modal.getLocation()).toHaveText("Location: Big City, Roosevelt Road 52"),
      expect.soft(modal.getDresscodeDescription()).toHaveText("Come dressed in our theme colors: #ffaa00 and #0033ff! Show off your creativity while rocking these colors to add to the festive vibe."),
      expect.soft(modal.getAdditionalComments()).toHaveText("I am looking forward to seeing you!"),
    ]);
  });
});
