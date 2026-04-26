export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = "#username";
    this.password = "#password";
    this.loginBtn = "#login";
  }

  async login(user, pass) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
  }
}