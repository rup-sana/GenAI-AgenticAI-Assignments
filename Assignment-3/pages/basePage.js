const fs = require('fs');
const path = require('path');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async takeScreenshot(name = 'screenshot') {
    const outputPath = path.resolve(__dirname, '../artifacts', `${name}.png`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    await this.page.screenshot({ path: outputPath, fullPage: true });
    return outputPath;
  }
}

module.exports = BasePage;
