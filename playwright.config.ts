import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;
const NOTIF_DELAY = process.env.NEXT_PUBLIC_NOTIFICATION_TEST_DELAY || "";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: NOTIF_DELAY ? `NEXT_PUBLIC_NOTIFICATION_TEST_DELAY=${NOTIF_DELAY} npm run dev` : "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
