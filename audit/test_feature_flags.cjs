const { chromium } = require('C:/Users/SAI AMOGH/.gemini/antigravity-ide/brain/4745360d-80ab-495e-a146-f053ecb52057/scratch/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const siteConfigPath = path.resolve(__dirname, '../src/config/site.ts');
const originalConfig = fs.readFileSync(siteConfigPath, 'utf8');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\SAI AMOGH\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();

  try {
    // TEST 1: Clear appUrl -> shows disabled everywhere
    console.log('Testing appUrl: "" ...');
    const emptyUrlConfig = originalConfig.replace("appUrl: 'https://trackment.vercel.app',", "appUrl: '',");
    fs.writeFileSync(siteConfigPath, emptyUrlConfig);
    await page.waitForTimeout(1000); // Allow Vite HMR

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    const disabledCount = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.open-app-btn'));
      const allDisabled = btns.every(b => b.classList.contains('open-app-disabled') && b.innerText.includes('App opening soon'));
      return { total: btns.length, allDisabled };
    });
    console.log('When appUrl is empty:', disabledCount);
    if (!disabledCount.allDisabled || disabledCount.total === 0) {
      throw new Error('Clearing appUrl did not show disabled state everywhere!');
    }

    // TEST 2: Toggle features.openAppButton to false -> site identical to baseline (0 buttons)
    console.log('Testing features.openAppButton: false ...');
    const disabledFlagConfig = originalConfig.replace("openAppButton: true,", "openAppButton: false,");
    fs.writeFileSync(siteConfigPath, disabledFlagConfig);
    await page.waitForTimeout(1000); // Allow Vite HMR

    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    const countOff = await page.evaluate(() => document.querySelectorAll('.open-app-btn').length);
    console.log('When openAppButton is false, button count on Home:', countOff);
    if (countOff !== 0) {
      throw new Error(`Expected 0 buttons when openAppButton is false, but found ${countOff}`);
    }

    console.log('✓ All behavior flag toggles passed successfully!');
  } finally {
    // Restore original config
    fs.writeFileSync(siteConfigPath, originalConfig);
    await browser.close();
  }
})();
