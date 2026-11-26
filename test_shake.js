const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    const t = msg.text();
    if (!t.includes('cdn.tailwindcss.com') && !t.includes('Babel transformer')) {
      console.log('LOG:', t);
    }
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));

  console.log('Finding hero shake element...');
  const digeetroEl = await page.$('.hero-shake-brand');
  if (digeetroEl) {
    const box = await digeetroEl.boundingBox();
    console.log('Bounding box:', box);

    // 1. Hover test
    console.log('Hovering over Digeetro!...');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise(r => setTimeout(r, 150));
    await page.screenshot({ path: 'test_shake_hover.png' });
    console.log('Captured test_shake_hover.png');

    // 2. Click test
    console.log('Clicking Digeetro! to trigger full shake...');
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    // Take screenshot during mid-shake (100ms)
    await new Promise(r => setTimeout(r, 100));
    await page.screenshot({ path: 'test_shake_active.png' });
    console.log('Captured test_shake_active.png');

    const hasShakeClass = await page.evaluate(el => el.classList.contains('hero-shake-active'), digeetroEl);
    console.log('Element has hero-shake-active during click:', hasShakeClass);
  }

  await browser.close();
  console.log('Shake testing finished!');
})();
