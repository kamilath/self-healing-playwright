import { Page } from "@playwright/test";
import fs from "fs";

export class LocatorManager {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  saveHealing(name: string, failed: string, working: string) {
    const file = "healing/healing-history.json";

    const data = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, "utf-8"))
      : [];

    data.push({
      element: name,
      failedLocator: failed,
      workingLocator: working,
      time: new Date().toISOString()
    });

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }

  async fill(name: string, locators: string[], value: string) {
    for (let i = 0; i < locators.length; i++) {
      const selector = locators[i];
      const element = this.page.locator(selector).first();

      try {
        await element.waitFor({
          state: "visible",
          timeout: 2000
        });

        await element.fill(value);

        console.log(`✅ ${name}: ${selector}`);

        if (i > 0) {
          this.saveHealing(
            name,
            locators[0],
            selector
          );

          console.log(`🔧 HEALED: ${name}`);
        }

        return;
      } catch {
        console.log(`❌ ${name}: ${selector}`);
      }
    }

    throw new Error(`Unable to find usable element: ${name}`);
  }

  async click(name: string, locators: string[]) {
    for (let i = 0; i < locators.length; i++) {
      const selector = locators[i];
      const element = this.page.locator(selector).first();

      try {
        await element.waitFor({
          state: "visible",
          timeout: 2000
        });

        await element.click();

        console.log(`✅ ${name}: ${selector}`);

        if (i > 0) {
          this.saveHealing(
            name,
            locators[0],
            selector
          );

          console.log(`🔧 HEALED: ${name}`);
        }

        return;
      } catch {
        console.log(`❌ ${name}: ${selector}`);
      }
    }

    throw new Error(`Unable to find usable element: ${name}`);
  }
}