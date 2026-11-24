const puppeteer = require('puppeteer');

async function testMobile() {
  console.log('Testing mobile responsiveness...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('[data-scroll-track]');
  await new Promise(r => setTimeout(r, 1000));

  // Capture Logo on mobile
  await page.screenshot({ path: 'mobile_logo.png' });
  console.log('Captured mobile_logo.png');

  // Capture Handshake on mobile (72%)
  await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    const target = (track.offsetHeight - window.innerHeight) * 0.72;
    window.scrollTo(0, target);
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'mobile_handshake.png' });
  console.log('Captured mobile_handshake.png');

  // Capture Welcome on mobile (92%)
  await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    const target = (track.offsetHeight - window.innerHeight) * 0.92;
    window.scrollTo(0, target);
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'mobile_welcome.png' });
  console.log('Captured mobile_welcome.png');

  await browser.close();
  console.log('Mobile tests completed successfully!');
}

testMobile().catch(console.error);
