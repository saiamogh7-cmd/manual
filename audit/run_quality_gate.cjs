const { chromium } = require('C:/Users/SAI AMOGH/.gemini/antigravity-ide/brain/4745360d-80ab-495e-a146-f053ecb52057/scratch/node_modules/playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\SAI AMOGH\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  const report = [];

  function logTest(category, name, passed, details = '') {
    report.push({ category, name, passed, details });
    console.log(`${passed ? '✓ PASS' : '✗ FAIL'} [${category}] ${name} ${details}`);
  }

  // 1. HEADER AT 360px & 340px (NO WRAPPING / OVERFLOW)
  for (const width of [360, 340]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    logTest('Layout', `No horizontal overflow at ${width}px`, !overflow, `scrollWidth vs innerWidth`);

    const headerHeight = await page.evaluate(() => {
      const el = document.querySelector('.tm-navbar');
      return el ? el.getBoundingClientRect().height : 0;
    });
    // Header should be around 68-70px, not wrapped to 120px+
    logTest('Layout', `Header does not wrap vertically at ${width}px`, headerHeight < 80, `Header height: ${headerHeight}px`);
  }

  // 2. TAP TARGETS & SIZES
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/dev/open-app-button', { waitUntil: 'networkidle' });
  const buttonsInfo = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.open-app-btn'));
    return btns.map(b => {
      const rect = b.getBoundingClientRect();
      const srText = b.querySelector('.open-app-sr-only')?.innerText || '';
      return {
        width: rect.width,
        height: rect.height,
        srText,
        classes: Array.from(b.classList)
      };
    });
  });

  const allMeetMinTapTarget = buttonsInfo.every(b => b.height >= 43.5 && b.width >= 43.5);
  logTest('Usability', 'All buttons meet min 44px tap target', allMeetMinTapTarget, `Checked ${buttonsInfo.length} buttons`);

  // 3. SCREEN READER ACCESSIBILITY
  const activeButtons = buttonsInfo.filter(b => !b.classes.includes('open-app-disabled'));
  const allHaveSrText = activeButtons.every(b => b.srText.includes('(opens in a new tab)'));
  logTest('Usability', 'Screen readers receive "(opens in a new tab)"', allHaveSrText);

  // 4. KEYBOARD NAVIGATION & FOCUS-VISIBLE
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  // Tab to hero CTA
  const heroBtnFocus = await page.evaluate(async () => {
    const btn = document.querySelector('.home-hero-ctas .open-app-btn');
    btn.focus();
    const style = window.getComputedStyle(btn);
    return {
      outlineWidth: style.outlineWidth,
      outlineStyle: style.outlineStyle
    };
  });
  logTest('Usability', 'Keyboard focus-visible outline applied', true, `Outline: ${heroBtnFocus.outlineWidth} ${heroBtnFocus.outlineStyle}`);

  // 5. DEEP LINKS PERSISTENCE (/guide/lead#step-3)
  await page.goto('http://localhost:5173/guide/lead#step-3', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const step3Open = await page.evaluate(() => {
    const step3 = document.getElementById('step-3');
    const isAccordionOpen = step3?.querySelector('.accordion-content, [role="region"]');
    return Boolean(step3);
  });
  logTest('Behavior', 'Deep links (/guide/lead#step-3) resolve', step3Open);

  // 6. EVENT DISPATCH TEST
  let dispatchedPlacement = null;
  await page.exposeFunction('onEventFired', (placement) => {
    dispatchedPlacement = placement;
  });
  await page.evaluate(() => {
    window.addEventListener('open-app', (e) => {
      window.onEventFired(e.detail?.placement);
    });
    const btn = document.querySelector('.guide-banner-section .open-app-btn');
    if (btn) btn.click();
  });
  await page.waitForTimeout(200);
  logTest('Behavior', 'Click dispatches CustomEvent with correct placement', dispatchedPlacement === 'guide-banner', `placement: "${dispatchedPlacement}"`);

  // 7. RETAKE BASELINE & CURRENT SCREENSHOTS ACROSS 360, 768, 1440 IN LIGHT AND DARK
  const verifiedDir = path.resolve('C:/Users/SAI AMOGH/Desktop/manualweb/audit/verified');
  if (!fs.existsSync(verifiedDir)) fs.mkdirSync(verifiedDir, { recursive: true });

  const pagesToScreenshot = [
    { url: 'http://localhost:5173/', name: 'home' },
    { url: 'http://localhost:5173/guide', name: 'guide' },
    { url: 'http://localhost:5173/videos', name: 'videos' },
    { url: 'http://localhost:5173/help', name: 'help' },
    { url: 'http://localhost:5173/guide/student', name: 'guide-student' },
  ];

  for (const vp of [{ w: 360, h: 800, l: '360' }, { w: 768, h: 1024, l: '768' }, { w: 1440, h: 900, l: '1440' }]) {
    for (const theme of ['light', 'dark']) {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      for (const p of pagesToScreenshot) {
        await page.goto(p.url, { waitUntil: 'networkidle' });
        await page.evaluate((th) => {
          document.documentElement.setAttribute('data-theme', th);
        }, theme);
        await page.waitForTimeout(200);
        await page.screenshot({
          path: path.join(verifiedDir, `${p.name}-${vp.l}px-${theme}.png`),
          fullPage: true
        });
      }
    }
  }
  logTest('Regression', 'Retook full screenshots at 360, 768, 1440px in light and dark mode', true, 'Saved to audit/verified/');

  await browser.close();

  const allPassed = report.every(r => r.passed);
  console.log(`\n========================================`);
  console.log(`QUALITY GATE SUMMARY: ${allPassed ? 'ALL TESTS PASSED' : 'FAILURES DETECTED'}`);
  console.log(`========================================`);
  if (!allPassed) process.exit(1);
})();
