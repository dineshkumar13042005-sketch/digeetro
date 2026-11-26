const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Click "Digeetro!"
  console.log('Clicking "Digeetro!" heading...');
  const headingDigeetro = await page.evaluateHandle(() => {
    const headings = Array.from(document.querySelectorAll('span, h1, h2'));
    return headings.find(el => el.textContent.trim() === 'Digeetro!') || document.querySelector('h1');
  });

  if (headingDigeetro) {
    const box = await headingDigeetro.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      // Wait 120ms so particles are flying in the air
      await new Promise(r => setTimeout(r, 120));
      
      const particleCount = await page.evaluate(() => {
        return document.querySelectorAll('.digeetro-click-particle, .digeetro-click-ripple').length;
      });
      console.log(`Active particles on click: ${particleCount}`);

      await page.screenshot({ path: 'test_click_effect_digeetro.png' });
      console.log('Captured test_click_effect_digeetro.png');
    }
  }

  // 2. Click "Let's Grow Together"
  console.log('Clicking "Let\'s Grow Together"...');
  await new Promise(r => setTimeout(r, 700)); // wait for previous particles to fade
  const scriptText = await page.evaluateHandle(() => {
    const els = Array.from(document.querySelectorAll('span, p, div'));
    return els.find(el => el.textContent.includes("Let's Grow Together"));
  });

  if (scriptText) {
    const box = await scriptText.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 120));
      await page.screenshot({ path: 'test_click_effect_together.png' });
      console.log('Captured test_click_effect_together.png');
    }
  }

  // 3. Test clicking paragraph text
  console.log('Clicking paragraph text...');
  await new Promise(r => setTimeout(r, 700));
  const pTag = await page.$('p');
  if (pTag) {
    const box = await pTag.boundingBox();
    if (box) {
      await page.mouse.click(box.x + 40, box.y + 10);
      await new Promise(r => setTimeout(r, 120));
      await page.screenshot({ path: 'test_click_effect_paragraph.png' });
      console.log('Captured test_click_effect_paragraph.png');
    }
  }

  await browser.close();
  console.log('Done testing click effects!');
})();
