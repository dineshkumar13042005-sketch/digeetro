const puppeteer = require('puppeteer');

async function captureAllScrollStages() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Stage 1: Logo
  await page.screenshot({ path: 'stage1_logo.png' });
  console.log('Saved stage1_logo.png');

  // 2. Stage 2: Stickmen walking (scrollY 1800)
  await page.evaluate(() => window.scrollTo(0, 1800));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'stage2_walking.png' });
  console.log('Saved stage2_walking.png');

  // 3. Stage 3: Stickmen handshake (scrollY 3100)
  await page.evaluate(() => window.scrollTo(0, 3100));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'stage3_handshake.png' });
  console.log('Saved stage3_handshake.png');

  // 4. Stage 4: Welcome to DIGEETRO Digital Solutions (scrollY 3900)
  await page.evaluate(() => window.scrollTo(0, 3900));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'stage4_welcome.png' });
  console.log('Saved stage4_welcome.png');

  await browser.close();
  console.log('All stages captured!');
}

captureAllScrollStages().catch(console.error);
