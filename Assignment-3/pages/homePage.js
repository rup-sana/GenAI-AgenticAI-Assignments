const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.pageHeading = 'h1';
  }

  async open(url = 'https://example.com') {
    await this.goto(url);
    await this.waitForPageLoad();
  }

  async getHeadingText() {
    return this.page.locator(this.pageHeading).first().textContent();
  }

  async waitForHeading() {
    await this.page.locator(this.pageHeading).first().waitFor();
  }
}

module.exports = HomePage;
