const puppeteer = require('puppeteer');

async function captureHero() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('#hero-landing-page');
  await new Promise(r => setTimeout(r, 1000));

  const el = await page.$('#hero-landing-page');
  if (el) {
    await el.screenshot({ path: 'landing_hero_desktop.png' });
    console.log('Successfully captured landing_hero_desktop.png');
  } else {
    console.log('Element not found');
  }

  await browser.close();
}

captureHero().catch(console.error);
