const { SlashCommandBuilder } = require('@discordjs/builders');
const Keyv = require('Keyv');
const { puppeteer } = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!'),
	async execute(interaction) {
    const keyv = new Keyv();
		const browserWSEndpoint = keyv.get('browserWSEndpoint');
		const browser = await puppeteer.connect({ browserWSEndpoint });
		const page = await browser.pages()[0];
		await interaction.reply('Type!');
    const string = interaction.options.getString('input');
    page.keyboard.type(string);
    page.keyboard.press('Enter');
	},
};
