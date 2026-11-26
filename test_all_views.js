const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const pages = [
    { url: '/', name: 'home' },
    { url: '/services', name: 'services' },
    { url: '/work', name: 'work' },
    { url: '/about', name: 'about' },
    { url: '/why-digeetro', name: 'why-digeetro' },
    { url: '/contact', name: 'contact' }
  ];

  console.log('--- TESTING ALL PAGES (DESKTOP & MOBILE) ---');

  for (const item of pages) {
    // 1. Desktop
    const dPage = await browser.newPage();
    await dPage.setViewport({ width: 1440, height: 900 });
    const dErrors = [];
    dPage.on('pageerror', err => dErrors.push(err.toString()));
    await dPage.goto('http://localhost:5173' + item.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 400));
    const dMetrics = await dPage.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }));
    await dPage.screenshot({ path: `view_desktop_${item.name}.png` });
    await dPage.close();

    // 2. Mobile
    const mPage = await browser.newPage();
    await mPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    const mErrors = [];
    mPage.on('pageerror', err => mErrors.push(err.toString()));
    await mPage.goto('http://localhost:5173' + item.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 400));
    const mMetrics = await mPage.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    }));
    await mPage.screenshot({ path: `view_mobile_${item.name}.png` });

    // Test mobile menu toggle
    let menuToggled = false;
    try {
      await mPage.click('button[aria-label="Toggle Navigation Menu"]');
      await new Promise(r => setTimeout(r, 300));
      menuToggled = true;
    } catch (e) {
      menuToggled = false;
    }

    await mPage.close();

    console.log(`[${item.name.toUpperCase()}]`);
    console.log(`  Desktop (1440px): errors=${dErrors.length}, overflow=${dMetrics.hasOverflow} (${dMetrics.scrollWidth}px vs ${dMetrics.clientWidth}px)`);
    console.log(`  Mobile (390px): errors=${mErrors.length}, overflow=${mMetrics.hasOverflow} (${mMetrics.scrollWidth}px vs ${mMetrics.clientWidth}px), menuToggle=${menuToggled}`);
  }

  await browser.close();
  console.log('--- ALL PAGES TESTED SUCCESSFULLY ---');
})();
