const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // 1. Desktop / System View (1440x900)
    const pageDesktop = await browser.newPage();
    await pageDesktop.setViewport({ width: 1440, height: 900 });

    pageDesktop.on('console', msg => {
      const t = msg.text();
      if (!t.includes('cdn.tailwindcss.com') && !t.includes('Babel transformer')) {
        console.log('[Desktop] LOG:', t);
      }
    });
    pageDesktop.on('pageerror', err => console.error('[Desktop] ERROR:', err.toString()));

    console.log('Testing System / Desktop view (1440x900)...');
    await pageDesktop.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 500));
    await pageDesktop.screenshot({ path: 'system_view_desktop.png' });
    console.log('Captured system_view_desktop.png');
    await pageDesktop.close();

    // 2. Mobile View (390x844 - iPhone / Modern Android)
    const pageMobile = await browser.newPage();
    await pageMobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    pageMobile.on('console', msg => {
      const t = msg.text();
      if (!t.includes('cdn.tailwindcss.com') && !t.includes('Babel transformer')) {
        console.log('[Mobile] LOG:', t);
      }
    });
    pageMobile.on('pageerror', err => console.error('[Mobile] ERROR:', err.toString()));

    console.log('Testing Mobile view (390x844)...');
    await pageMobile.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 500));
    await pageMobile.screenshot({ path: 'mobile_view_hero.png' });
    console.log('Captured mobile_view_hero.png');

    // Click Hamburger Button on Mobile
    console.log('Clicking Mobile Hamburger Menu button...');
    await pageMobile.click('button[aria-label="Toggle Navigation Menu"]');
    await new Promise(r => setTimeout(r, 400));
    await pageMobile.screenshot({ path: 'mobile_menu_open.png' });
    console.log('Captured mobile_menu_open.png');

    // Scroll down to stats and services on mobile
    await pageMobile.evaluate(() => {
      window.scrollBy(0, 700);
    });
    await new Promise(r => setTimeout(r, 400));
    await pageMobile.screenshot({ path: 'mobile_view_stats.png' });
    console.log('Captured mobile_view_stats.png');

    await pageMobile.close();
    await browser.close();
    console.log('Both System & Mobile views verified successfully!');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
