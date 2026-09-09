import { Page } from "@playwright/test";
import { LocatorManager } from "../utils/LocatorManager";

export class LoginPage {
  page: Page;
  locator: LocatorManager;

  username = [
  'input[id="wrong-username"]',
  'input[name="username"]',
  'input[placeholder="Username"]'
];

  password = [
    'input[id="password"]',
    'input[name="password"]',
    'input[placeholder="Password"]'
  ];

  loginButton = [
    'button[id="login-button"]',
    'button[type="submit"]',
    'button:has-text("Login")'
  ];

  constructor(page: Page) {
    this.page = page;
    this.locator = new LocatorManager(page);
  }

  async open() {
    await this.page.goto("/web/index.php/auth/login");
  }

  async login(user: string, pass: string) {
    await this.locator.fill(
      "Username",
      this.username,
      user
    );

    await this.locator.fill(
      "Password",
      this.password,
      pass
    );

    await this.locator.click(
      "Login Button",
      this.loginButton
    );
  }
}