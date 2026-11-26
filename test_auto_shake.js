const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));

  console.log('Testing AUTO SHAKE LEFT TO RIGHT (Without Mouse)...');

  // Do NOT move or click mouse at all!
  const positions = [];
  for (let i = 0; i < 6; i++) {
    const data = await page.evaluate(() => {
      const el = document.querySelector('.auto-shake-left-right');
      const rect = el ? el.getBoundingClientRect() : null;
      const compStyle = el ? window.getComputedStyle(el).transform : '';
      return { x: rect ? rect.x : 0, transform: compStyle };
    });
    positions.push(data);
    await page.screenshot({ path: `auto_shake_frame_${i}.png` });
    await new Promise(r => setTimeout(r, 150));
  }

  console.log('Recorded positions without mouse:', positions);

  // Check if position.x or transform varies (proving it shakes left to right automatically)
  const transforms = positions.map(p => p.transform);
  const isMoving = new Set(transforms).size > 1;
  console.log('Shaking automatically without mouse:', isMoving);

  await browser.close();
  console.log('Auto shake verification complete!');
})();
