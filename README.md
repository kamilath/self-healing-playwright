# 🛡 Self-Healing Playwright Automation Framework

A **Self-Healing Test Automation Framework** built using **Playwright + TypeScript**.

The framework automatically tries alternative locators when the primary locator fails, allowing tests to continue without immediate manual locator updates.

## 🚀 Features

* Playwright + TypeScript
* Page Object Model (POM)
* Self-healing locators
* Multiple fallback locators
* Automatic healing history
* Custom QA automation dashboard
* Test execution reporting
* Login functional test cases
* Positive and negative test scenarios
* Locator health tracking

## 🏗 Project Structure

```text
self-healing-playwright/
│
├── tests/
│   └── login.spec.ts
│
├── pages/
│   └── LoginPage.ts
│
├── healing/
│   └── healing-history.json
│
├── utils/
│   ├── LocatorManager.ts
│   ├── TestResultReporter.ts
│   ├── HealingDashboard.ts
│   └── test-results.json
│
├── reports/
│   └── healing-dashboard.html
│
├── test-data/
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🔧 How Self-Healing Works

The framework maintains multiple locators for an element.

Example:

```ts
username = [
  'input[id="wrong-username"]',
  'input[name="username"]',
  'input[placeholder="Username"]'
];
```

The framework first tries the primary locator.

If it fails, it automatically tries the next available locator.

```text
Primary Locator
      ↓
   Fails ❌
      ↓
Fallback Locator
      ↓
   Works ✅
      ↓
Locator Healed 🔧
      ↓
Healing History Saved
```

The successful fallback locator is stored in:

```text
healing/healing-history.json
```

## 🧪 Test Cases

The project currently contains 12 login test cases:

| Test Case | Description                              |
| --------- | ---------------------------------------- |
| TC001     | Verify login with valid credentials      |
| TC002     | Verify login with invalid username       |
| TC003     | Verify login with invalid password       |
| TC004     | Verify login with both fields empty      |
| TC005     | Verify login with empty username         |
| TC006     | Verify login with empty password         |
| TC007     | Verify username field is displayed       |
| TC008     | Verify password field is displayed       |
| TC009     | Verify login button is displayed         |
| TC010     | Verify password field is masked          |
| TC011     | Verify username locator self-healing     |
| TC012     | Verify login button locator self-healing |

## 📊 Custom QA Dashboard

After test execution, the framework automatically generates:

```text
reports/healing-dashboard.html
```

The dashboard provides:

* Total tests
* Passed tests
* Failed tests
* Skipped tests
* Total healing attempts
* Successfully healed locators
* Healing success rate
* Test execution duration
* Test result details
* Locator health
* Recent healing events

The dashboard is generated automatically through the custom Playwright reporter.

## ▶️ Run Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test:

```bash
npx playwright test tests/login.spec.ts
```

## 📋 View Dashboard

After running the tests, open:

```text
reports/healing-dashboard.html
```

You can open the HTML file directly in a browser.

## 🛠 Tech Stack

* **Playwright**
* **TypeScript**
* **Node.js**
* **Page Object Model**
* **HTML/CSS**
* **JSON**

## 🎯 Project Goal

The goal of this project is to demonstrate how a test automation framework can improve test stability by automatically recovering from locator changes.

Instead of immediately failing when a locator becomes invalid, the framework attempts predefined fallback locators and records successful healing events for analysis.

## 👩‍💻 Author

**Kamilath Rifka S**

SDET | Playwright | TypeScript | Automation Testing
