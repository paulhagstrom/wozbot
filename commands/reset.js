const { SlashCommandBuilder } = require('@discordjs/builders');
// Allow spawning so we can launch the emulator in the container
// const { exec } = require('child_process');
const { puppeteer } = require('puppeteer');
// const fs = require('fs');
const Keyv = require('Keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		const keyv = new Keyv();
		const browserWSEndpoint = keyv.get('browserWSEndpoint');
		const browser = await puppeteer.connect({ browserWSEndpoint });
		const page = await browser.pages()[0];
		await page.goto('file://localhost/apple2js.html#ugwp');
		await interaction.reply('CHUNKA CHUNKA CHUNKA!');
	},
};
