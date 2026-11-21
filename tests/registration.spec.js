const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../pages/RegistrationPage");

test.describe("Registration tests", () => {
  test("User can register successfully", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const email = `aqa-${Date.now()}@example.com`;

    await registrationPage.open();

    await registrationPage.fillRegistrationForm(
      "Marta",
      "Behun",
      email,
      "Password123",
      "Password123",
    );

    await expect(registrationPage.registerButton).toBeEnabled();

    await registrationPage.submit();

    await expect(page).toHaveURL(/\/panel\/garage/);
  });

  test("Should show error when Name is empty", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.nameInput.focus();
    await registrationPage.nameInput.blur();

    await expect(page.getByText("Name required")).toBeVisible();
    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Name contains numbers", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.nameInput.fill("Marta123");
    await registrationPage.nameInput.blur();

    await expect(page.getByText("Name is invalid")).toBeVisible();
    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Name is too short", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.nameInput.fill("A");
    await registrationPage.nameInput.blur();

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long"),
    ).toBeVisible();

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Email is invalid", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.emailInput.fill("aqa-invalid-email");
    await registrationPage.emailInput.blur();

    await expect(page.getByText("Email is incorrect")).toBeVisible();
    await expect(registrationPage.emailInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Password has no uppercase letter", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.passwordInput.fill("password123");
    await registrationPage.passwordInput.blur();

    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      ),
    ).toBeVisible();

    await expect(registrationPage.passwordInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Passwords do not match", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const email = `aqa-${Date.now()}@example.com`;

    await registrationPage.open();

    await registrationPage.fillRegistrationForm(
      "Marta",
      "Behun",
      email,
      "Password123",
      "Password456",
    );

    await registrationPage.repeatPasswordInput.blur();

    await expect(registrationPage.registerButton).toBeDisabled();

    await expect(registrationPage.repeatPasswordInput).toHaveClass(
      /is-invalid/,
    );
    await expect(page.getByText("Passwords do not match.")).toBeVisible();
  });

  test("Should show error when Last name is empty", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.lastNameInput.focus();
    await registrationPage.lastNameInput.blur();

    await expect(page.getByText("Last name required")).toBeVisible();
    await expect(registrationPage.lastNameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Last name contains numbers", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.lastNameInput.fill("Behun123");
    await registrationPage.lastNameInput.blur();

    await expect(page.getByText("Last name is invalid")).toBeVisible();
    await expect(registrationPage.lastNameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Last name is too short", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.lastNameInput.fill("B");
    await registrationPage.lastNameInput.blur();

    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long"),
    ).toBeVisible();

    await expect(registrationPage.lastNameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Email is empty", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.emailInput.focus();
    await registrationPage.emailInput.blur();

    await expect(page.getByText("Email required")).toBeVisible();
    await expect(registrationPage.emailInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Password is empty", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.passwordInput.focus();
    await registrationPage.passwordInput.blur();

    await expect(page.getByText("Password required")).toBeVisible();
    await expect(registrationPage.passwordInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test("Should show error when Re-enter password is empty", async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.open();

    await registrationPage.repeatPasswordInput.focus();
    await registrationPage.repeatPasswordInput.blur();

    await expect(page.getByText("Re-enter password required")).toBeVisible();
    await expect(registrationPage.repeatPasswordInput).toHaveClass(
      /is-invalid/,
    );
    await expect(registrationPage.registerButton).toBeDisabled();
  });
});
