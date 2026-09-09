import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 60000,

  use: {
    baseURL: "https://opensource-demo.orangehrmlive.com",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure"
  },

  reporter: [
    ["list"],
    ["html", { outputFolder: "reports" }],
    ["./utils/TestResultReporter.ts"]
  ]
});