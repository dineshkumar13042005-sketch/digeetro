const puppeteer = require('puppeteer');

async function verify() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('[data-scroll-track]');
  await new Promise(r => setTimeout(r, 1200));

  // 1. Logo
  await page.screenshot({ path: 'verified_logo.png' });
  console.log('Captured verified_logo.png');

  // 2. Handshake (72%)
  await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    const target = (track.offsetHeight - window.innerHeight) * 0.72;
    window.scrollTo(0, target);
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'verified_handshake.png' });
  console.log('Captured verified_handshake.png');

  // 3. Welcome (92%)
  await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    const target = (track.offsetHeight - window.innerHeight) * 0.92;
    window.scrollTo(0, target);
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'verified_welcome.png' });
  console.log('Captured verified_welcome.png');

  await browser.close();
  console.log('All verified!');
}

verify().catch(console.error);
