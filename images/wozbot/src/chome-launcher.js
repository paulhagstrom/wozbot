const { puppeteer } = require('puppeteer');

// launch a headless browser
(async() => {
	const browser = await puppeteer.launch();
	console.info(browser);
	const browserWSEndpoint = browser.wsEndpoint();
	console.log(`browser endpoint: ${browserWSEndpoint}`);
	await browser.close();
})();
