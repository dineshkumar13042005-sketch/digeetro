const puppeteer = require('puppeteer');

async function testScrollSteps() {
  console.log('Testing full scroll progression...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('[data-scroll-track]');
  await new Promise(r => setTimeout(r, 1000));

  const totalHeight = await page.evaluate(() => {
    const track = document.querySelector('[data-scroll-track]');
    return track.offsetHeight - window.innerHeight;
  });
  console.log('Total scrollable height:', totalHeight);

  async function step(p, filename) {
    const target = totalHeight * p;
    await page.evaluate((t) => {
      if (window.__lenis) {
        window.__lenis.scrollTo(t, { immediate: true });
      } else {
        window.scrollTo(0, t);
      }
    }, target);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: filename });
    console.log(`Captured ${filename} at progress ${p}`);
  }

  // 1. Entrance (30%)
  await step(0.30, 'step2_entrance.png');

  // 2. Walk (50%)
  await step(0.50, 'step3_walk.png');

  // 3. Handshake (68%)
  await step(0.68, 'step4_handshake.png');

  // 4. Welcome Scene (82%)
  await step(0.82, 'step5_welcome_start.png');

  // 5. Welcome Scene (92%)
  await step(0.92, 'step6_welcome_full.png');

  await browser.close();
  console.log('Scroll steps completed!');
}

testScrollSteps().catch(console.error);
