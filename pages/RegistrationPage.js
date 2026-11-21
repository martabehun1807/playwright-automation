class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.signUpButton = page.getByRole("button", { name: "Sign up" });
    this.nameInput = page.locator("#signupName");
    this.lastNameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  async open() {
    await this.page.goto("/");
    await this.signUpButton.click();
  }

  async fillRegistrationForm(name, lastName, email, password, repeatPassword) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async submit() {
    await this.registerButton.click();
  }
}

module.exports = { RegistrationPage };
