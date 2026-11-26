const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  let mascotLoaded = false;
  let mascotStatus = null;
  let mascotContentType = null;

  page.on('response', res => {
    if (res.url().includes('/mascot.png')) {
      mascotLoaded = true;
      mascotStatus = res.status();
      mascotContentType = res.headers()['content-type'];
    }
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));

  const imgInfo = await page.evaluate(() => {
    const img = document.querySelector('img[alt="Digeetro 3D Mascot Character"]');
    return img ? {
      src: img.src,
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete
    } : null;
  });

  console.log('Mascot network response:', { mascotLoaded, mascotStatus, mascotContentType });
  console.log('Mascot DOM image state:', imgInfo);

  await page.screenshot({ path: 'mascot_verified.png' });
  await browser.close();
  console.log('Verification done!');
})();
