const path = require('path');
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: path.resolve(__dirname, '../tests'),
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
