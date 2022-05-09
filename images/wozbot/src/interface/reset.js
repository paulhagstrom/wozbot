const puppeteer = require('puppeteer');
const fs = require('fs');

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
}
