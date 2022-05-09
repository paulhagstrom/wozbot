const { execSync } = require('child_process');
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	async recordScreen() {
		const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		console.log(`show: retrieved browser endpoint: ${browserWSEndpoint}`);
		const browser = await puppeteer.connect({ browserWSEndpoint });
		console.log('connected');
		const pages = await browser.pages();
		console.log('pages retrieved');
		const page = pages[0];
		console.log('Frame capture starting.');
		for (let frame = 1; frame <= 10; frame++) {
			await page.screenshot({path:`/tmp/screen${frame}.jpg`});
			await new Promise(resolve => setTimeout(resolve, 100));
		}
		console.log('Frames captured.');
		// use ffmpeg to make a looping gif
		execSync('ffmpeg -y -f image2 -framerate 10 -i /tmp/screen%d.jpg -loop 0 /tmp/screen.gif');
		console.log('Gif created.');
	},
	async shootScreen() {
		const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		console.log(`show: retrieved browser endpoint: ${browserWSEndpoint}`);
		const browser = await puppeteer.connect({ browserWSEndpoint });
		console.log('connected');
		const pages = await browser.pages();
		console.log('pages retrieved');
		const page = pages[0];
		console.log('Frame capture starting.');
		await page.screenshot({path:`/tmp/screenshot.jpg`});
		console.log('Frame captured.');
		console.log('Jpg created.');
	},
};
