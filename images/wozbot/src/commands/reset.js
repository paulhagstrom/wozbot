const { SlashCommandBuilder } = require('@discordjs/builders');
// Allow spawning so we can launch the emulator in the container
// const { exec } = require('child_process');
const puppeteer = require('puppeteer');
const fs = require('fs');
// const Keyv = require('keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		// const keyv = new Keyv();
		// const browserWSEndpoint = await keyv.get('browserWSEndpoint');
		const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		const browser = await puppeteer.connect({ browserWSEndpoint });
		const pages = await browser.pages();
		const page = pages[0];
		await page.goto('file://localhost/apple2js.html#ugwp');
		await interaction.reply('CHUNKA CHUNKA CHUNKA!');
	},
};
