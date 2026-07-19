// @ts-check
// import { defineConfig, devices } from '@playwright/test';
const { defineConfig } = require('@playwright/test')
const config = defineConfig({
  testDir: './tests',
  timeout : 10 * 30000,
  reporter: 'html',
  workers: 5,
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot : 'on',
    trace :'on',
    launchOptions: {
      args: ['--start-maximized']
    },
    viewport: null

  },

});
module.exports = config;