const { SlashCommandBuilder } = require('@discordjs/builders');
// const puppeteer = require('puppeteer');
// const fs = require('fs');
const { execSync } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		await interaction.deferReply();
		// kill old one
		execSync('pkill -f izapple2', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
		});
		// launch new one
		execSync('/usr/src/emulator/izapple2 disks/uwgp.dsk &', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
		});
		// const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		// const browser = await puppeteer.connect({ browserWSEndpoint });
		// const pages = await browser.pages();
		// const page = pages[0];
		// await page.goto('http://apple2js:8080/cyaniide.html?disk1=disks/ugwp.dsk');
		// await page.goto('http://apple2js:8080/apple2js.html#ugwp');
		await interaction.editReply('CHUNKA CHUNKA CHUNKA!');
	},
};
