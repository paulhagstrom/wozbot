const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		await interaction.deferReply();
		const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		const browser = await puppeteer.connect({ browserWSEndpoint });
		const pages = await browser.pages();
		const page = pages[0];
		await page.goto('http://apple2js:8080/cyaniide.html?disk1=ugwp.dsk');
		// await page.goto('http://apple2js:8080/apple2js.html#ugwp');
		await interaction.editReply('CHUNKA CHUNKA CHUNKA!');
	},
};
