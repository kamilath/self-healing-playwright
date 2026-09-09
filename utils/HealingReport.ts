import fs from "fs";

export class HealingReport {
  generate() {
    const file = "healing/healing-history.json";

    if (!fs.existsSync(file)) {
      console.log("No healing history found");
      return;
    }

    const data = JSON.parse(
      fs.readFileSync(file, "utf-8")
    );

    const total = data.length;

    console.log("\n========== HEALING REPORT ==========");
    console.log(`Total healed locators : ${total}`);

    for (const item of data) {
      console.log(`\nElement          : ${item.element}`);
      console.log(`Failed locator   : ${item.failedLocator}`);
      console.log(`Working locator  : ${item.workingLocator}`);
      console.log(`Time             : ${item.time}`);
    }

    console.log("\n====================================");
  }
}