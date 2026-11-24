const puppeteer = require('puppeteer');

async function testSequence() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER_ERROR:', err.message));

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Total scroll distance is 650vh - 100vh = 550vh = 5.5 * 900 = 4950px
  
  // 1. Scene 1: Logo Reveal (0%)
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'seq_1_logo.png' });
  console.log('Captured seq_1_logo.png (0%)');

  // 2. Scene 2: Stickmen Walking (35% -> ~1700px)
  await page.evaluate(() => window.scrollTo(0, 1700));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'seq_2_walking.png' });
  console.log('Captured seq_2_walking.png (35%)');

  // 3. Scene 3: Handshake Connection & Clasp (70% -> ~3500px)
  await page.evaluate(() => window.scrollTo(0, 3500));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'seq_3_handshake.png' });
  console.log('Captured seq_3_handshake.png (70%)');

  // 4. Scene 4: Welcome to DIGEETRO (92% -> ~4550px)
  await page.evaluate(() => window.scrollTo(0, 4550));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'seq_4_welcome.png' });
  console.log('Captured seq_4_welcome.png (92%)');

  await browser.close();
  console.log('Sequence testing complete!');
}

testSequence().catch(console.error);
