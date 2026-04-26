import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]],

  use: {
    headless: true,
    baseURL: 'https://example.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro 11'] },
    }
  ]
});