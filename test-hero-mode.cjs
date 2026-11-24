const puppeteer = require('puppeteer');

async function testHeroMode() {
  console.log('Capturing Landing Page Hero Design mode...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Click on the 'Hero Design' switcher button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const heroBtn = buttons.find(b => b.textContent.includes('Hero Design'));
    if (heroBtn) heroBtn.click();
  });

  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'digeetro_hero_design.png' });
  console.log('Saved digeetro_hero_design.png');

  await browser.close();
  console.log('Done!');
}

testHeroMode().catch(console.error);
