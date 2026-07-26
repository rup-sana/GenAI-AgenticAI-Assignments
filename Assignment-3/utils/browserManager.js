const { chromium } = require('@playwright/test');

class BrowserManager {
  async launchBrowser(options = {}) {
    const browser = await chromium.launch({ headless: true, ...options });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();

    return { browser, context, page };
  }

  async closeBrowser(browser, context) {
    await context?.close();
    await browser?.close();
  }
}

module.exports = new BrowserManager();
