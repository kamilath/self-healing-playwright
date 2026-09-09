
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("OrangeHRM Login Test Cases", () => {

  test("TC001 - Verify login with valid credentials", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.login("Admin", "admin123");

    await expect(page).toHaveURL(/dashboard/);
  });


  test("TC002 - Verify login with invalid username", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.login("WrongUser", "admin123");

    await expect(
      page.locator(".oxd-alert-content-text")
    ).toHaveText("Invalid credentials");
  });


  test("TC003 - Verify login with invalid password", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.login("Admin", "wrong123");

    await expect(
      page.locator(".oxd-alert-content-text")
    ).toHaveText("Invalid credentials");
  });


  test("TC004 - Verify login with both fields empty", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.locator.click(
      "Login Button",
      login.loginButton
    );

    const requiredMessages =
      page.locator(".oxd-input-group .oxd-input-group__message");

    await expect(requiredMessages).toHaveCount(2);
  });


  test("TC005 - Verify login with empty username", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.locator.fill(
      "Password",
      login.password,
      "admin123"
    );

    await login.locator.click(
      "Login Button",
      login.loginButton
    );

    await expect(
      page.locator(
        ".oxd-input-group:has(input[name='username']) .oxd-input-group__message"
      )
    ).toHaveText("Required");
  });


  test("TC006 - Verify login with empty password", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.locator.fill(
      "Username",
      login.username,
      "Admin"
    );

    await login.locator.click(
      "Login Button",
      login.loginButton
    );

    await expect(
      page.locator(
        ".oxd-input-group:has(input[name='password']) .oxd-input-group__message"
      )
    ).toHaveText("Required");
  });


  test("TC007 - Verify username field is displayed", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await expect(
      page.locator("input[name='username']")
    ).toBeVisible();
  });


  test("TC008 - Verify password field is displayed", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await expect(
      page.locator("input[name='password']")
    ).toBeVisible();
  });


  test("TC009 - Verify login button is displayed", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await expect(
      page.locator("button[type='submit']")
    ).toBeVisible();
  });


  test("TC010 - Verify password field is masked", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await expect(
      page.locator("input[name='password']")
    ).toHaveAttribute("type", "password");
  });


  test("TC011 - Verify username locator self-healing", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.locator.fill(
      "Username",
      login.username,
      "Admin"
    );

    await expect(
      page.locator("input[name='username']")
    ).toHaveValue("Admin");
  });


  test("TC012 - Verify login button locator self-healing", async ({ page }) => {

    const login = new LoginPage(page);

    await login.open();

    await login.locator.fill(
      "Username",
      login.username,
      "Admin"
    );

    await login.locator.fill(
      "Password",
      login.password,
      "admin123"
    );

    await login.locator.click(
      "Login Button",
      login.loginButton
    );

    await expect(page).toHaveURL(/dashboard/);
  });

});
