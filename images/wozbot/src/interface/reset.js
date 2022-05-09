const puppeteer = require('puppeteer');
const fs = require('fs');

// puppeteer speedup: https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/
const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
	// adding this one to avoid docker problems running as root
	'--disable-setuid-sandbox',
];

module.exports = {
  async stopEmulator() {
    // stopping is not really a thing for apple2js, we just reload
    console.log('Pretending to stop emulator.');
  },
  async startEmulator() {
    console.log('Starting (reloading) emulator.');
    const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
    const browser = await puppeteer.connect({ browserWSEndpoint });
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto('http://apple2js:8080/apple2js.html?gl_canvas=false#ugwp');
  },
  async initEmulator() {
    const browser = await puppeteer.launch({
      headless: true,
      userDataDir: '/tmp/puppeteer',
      args: minimal_args
    });
    const browserWSEndpoint = browser.wsEndpoint();
    console.log(`browser endpoint: ${browserWSEndpoint}`);
    // start the emulator
    const page = await browser.newPage();
    await page.goto('http://apple2js:8080/apple2js.html?gl_canvas=false#dos33master');
    // go full screen
    await page.keyboard.down('Shift');
    await page.keyboard.press('F2');
    browser.disconnect();
    // save the wsEndpoint
    fs.writeFile('/tmp/a2js-ws', browserWSEndpoint, err => {
      if (err) console.error(err);
    });
  }
}
