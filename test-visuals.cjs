const puppeteer = require('puppeteer');

async function testScenes() {
  console.log('Starting visual test with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  console.log('Page loaded successfully');

  await new Promise(r => setTimeout(r, 1000));

  async function captureScene(progressVal, filename, description) {
    console.log(`Testing ${description} (progress: ${progressVal})...`);
    await page.evaluate((p) => {
      const track = document.querySelector('[data-scroll-track]');
      const target = (track.offsetHeight - window.innerHeight) * p;
      window.scrollTo(0, target);
    }, progressVal);

    // Wait for GSAP & Lenis smooth scroll and animations to settle
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({ path: filename });
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Scene 1: Logo Reveal (5%)
  await captureScene(0.06, 'scene1_logo.png', 'Scene 1: Original Brand Logo Reveal');

  // 2. Scene 2: Stickmen Entrance (30%)
  await captureScene(0.30, 'scene2_entrance.png', 'Scene 2: Stickmen Entrance from Sides');

  // 3. Scene 2: Stickmen Walking & Approach (50%)
  await captureScene(0.50, 'scene2_approach.png', 'Scene 2: Stickmen Walking Towards Each Other');

  // 4. Scene 3: Handshake & Cinematic VFX (72%)
  await captureScene(0.72, 'scene3_handshake.png', 'Scene 3: Cinematic Handshake & VFX');

  // 5. Scene 4: Welcome to DIGEETRO (92%)
  await captureScene(0.92, 'scene4_welcome.png', 'Scene 4: Welcome to DIGEETRO Final Reveal');

  await browser.close();
  console.log('All visual tests completed successfully!');
}

testScenes().catch(console.error);
