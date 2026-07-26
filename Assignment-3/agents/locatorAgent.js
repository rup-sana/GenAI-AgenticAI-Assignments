const { chromium } = require('@playwright/test');
const BaseAgent = require('./baseAgent');

class LocatorAgent extends BaseAgent {
  constructor(options = {}) {
    super(options);
  }

  // Responsibility: inspect a live webpage with Playwright and extract interactive elements.
  async discoverLocators(url, pageContext = {}) {
    const context = this.buildContext(pageContext);
    const extractedData = await this.inspectPage(url);
    const mcpContext = await this.requestMcpContext({
      ...pageContext,
      title: extractedData.title,
      url: extractedData.url,
      buttons: extractedData.buttons,
      links: extractedData.links,
      forms: extractedData.forms,
      inputFields: extractedData.inputFields,
      dropdowns: extractedData.dropdowns,
      textareas: extractedData.textareas,
      tables: extractedData.tables,
    });
    const providerResult = await this.invokeProvider('Inspect webpage via Playwright', { ...context, mcpContext });

    return {
      agent: 'LocatorAgent',
      context,
      mcpContext,
      locators: extractedData.locators,
      providerMetadata: providerResult,
    };
  }

  async inspectPage(url) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle').catch(() => {});

      const buttons = await this.extractElements(page, 'button, input[type="button"], input[type="submit"], input[type="reset"]');
      const links = await this.extractElements(page, 'a[href]');
      const formElements = await this.extractElements(page, 'form');
      const inputFields = await this.extractElements(page, 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"])');
      const dropdowns = await this.extractElements(page, 'select');
      const textareas = await this.extractElements(page, 'textarea');
      const tables = await this.extractElements(page, 'table');

      return {
        title: await page.title(),
        url: page.url(),
        buttons,
        links,
        forms: formElements,
        inputFields,
        dropdowns,
        textareas,
        tables,
        locators: [
          { name: 'buttons', type: 'css', value: 'button, input[type="button"], input[type="submit"], input[type="reset"]' },
          { name: 'links', type: 'css', value: 'a[href]' },
          { name: 'inputFields', type: 'css', value: 'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"])' },
          { name: 'dropdowns', type: 'css', value: 'select' },
          { name: 'textareas', type: 'css', value: 'textarea' },
          { name: 'tables', type: 'css', value: 'table' },
        ],
      };
    } finally {
      await browser.close();
    }
  }

  async extractElements(page, selector) {
    return page.locator(selector).evaluateAll((nodes) =>
      nodes.map((node) => ({
        text: node.textContent ? node.textContent.trim() : '',
        id: node.id || '',
        name: node.getAttribute('name') || '',
        placeholder: node.getAttribute('placeholder') || '',
        type: node.getAttribute('type') || '',
        value: node.getAttribute('value') || '',
        href: node.getAttribute('href') || '',
        action: node.getAttribute('action') || '',
        method: node.getAttribute('method') || '',
      }))
    );
  }
}

module.exports = LocatorAgent;
