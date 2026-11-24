const puppeteer = require('puppeteer');

async function debug() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.error('ERROR:', err));

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('[data-scroll-track]');
  await new Promise(r => setTimeout(r, 1000));

  const check = async (label) => {
    const res = await page.evaluate(() => {
      const track = document.querySelector('[data-scroll-track]');
      return {
        scrollY: window.scrollY,
        trackTop: track ? track.getBoundingClientRect().top : null,
        trackHeight: track ? track.offsetHeight : null,
        hasLogo: !!document.querySelector('img[alt="DIGEETRO DIGITAL SOLUTIONS"]'),
        hasStickman: !!document.querySelector('.pencil-character'),
        hasWelcome: !!document.querySelector('.digeetro-gradient-text'),
      };
    });
    console.log(label, res);
  };

  await check('Initial (scrollY 0):');

  // Scroll to 1500
  await page.evaluate(() => window.scrollTo(0, 1500));
  await new Promise(r => setTimeout(r, 1200));
  await check('After scroll to 1500:');

  // Scroll to 3000
  await page.evaluate(() => window.scrollTo(0, 3000));
  await new Promise(r => setTimeout(r, 1200));
  await check('After scroll to 3000:');

  // Scroll to 4000
  await page.evaluate(() => window.scrollTo(0, 4000));
  await new Promise(r => setTimeout(r, 1200));
  await check('After scroll to 4000:');

  await browser.close();
}

debug().catch(console.error);
