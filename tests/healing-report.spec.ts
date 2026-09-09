import { test } from "@playwright/test";
import { HealingReport } from "../utils/HealingReport";

test("healing report", async () => {
  const report = new HealingReport();

  report.generate();
});