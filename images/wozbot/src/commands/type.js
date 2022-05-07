const { SlashCommandBuilder } = require('@discordjs/builders');
// const Keyv = require('keyv');
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!'),
	async execute(interaction) {
    // const keyv = new Keyv();
		// const browserWSEndpoint = await keyv.get('browserWSEndpoint');
    const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		const browser = await puppeteer.connect({ browserWSEndpoint });
		const page = await browser.pages()[0];
		await interaction.reply('Type!');
    const string = interaction.options.getString('input');
    await page.keyboard.type(string);
    await page.keyboard.press('Enter');
	},
};
