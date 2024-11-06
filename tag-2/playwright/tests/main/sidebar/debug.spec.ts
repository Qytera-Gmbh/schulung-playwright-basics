import { chatTest } from "playwright/fixtures/fixtures";

chatTest("no alarms in overview, no alarms recorded", async ({ on, page }) => {
  await on(page).machine.open("FZR 2000", "BN DE 598");
  await on(page).machine.car.alarm.check.alarmsPresent([]);
  await on(page).machine.car.alarm.do.switchToAnalysis();
  await on(page).analysis.telemetry.sensor.check.alarmsRecorded([]);
});
