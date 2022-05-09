const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	async sendLine(line) {
		const page = await getPage();
		// introduce a delay because it can outpace the emulator
		await page.keyboard.type(line, {delay: 100});
  },
  async sendReturn() {
		const page = await getPage();
		await page.keyboard.press('Enter');
  },
};

async function getPage() {
	const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
	const browser = await puppeteer.connect({ browserWSEndpoint });
	const pages = await browser.pages();
	return pages[0];
}
