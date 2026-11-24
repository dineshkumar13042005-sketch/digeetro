const puppeteer = require('puppeteer');

async function testCleanExperience() {
  console.log('Capturing clean website without top bar...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Capture clean logo scene (0%)
  await page.screenshot({ path: 'clean_logo.png' });
  console.log('Captured clean_logo.png');

  // 2. Capture clean handshake scene (72%)
  await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    const target = (track.offsetHeight - window.innerHeight) * 0.72;
    window.scrollTo(0, target);
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'clean_handshake.png' });
  console.log('Captured clean_handshake.png');

  // 3. Capture clean welcome scene (92%)
  await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    const target = (track.offsetHeight - window.innerHeight) * 0.92;
    window.scrollTo(0, target);
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'clean_welcome.png' });
  console.log('Captured clean_welcome.png');

  await browser.close();
  console.log('Clean verification completed!');
}

testCleanExperience().catch(console.error);
