const { SlashCommandBuilder } = require('@discordjs/builders');
// const Keyv = require('keyv');
const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!')
    .addStringOption(option => option.setName('line').setDescription('Enter a line to type.')),
	async execute(interaction) {
    // const keyv = new Keyv();
		// const browserWSEndpoint = await keyv.get('browserWSEndpoint');
    const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		const browser = await puppeteer.connect({ browserWSEndpoint });
    const pages = await browser.pages();
		const page = pages[0];
    const line = interaction.options.getString('line');
    if (line) {
      await interaction.reply(`Type! ${line}`);
      await page.keyboard.type(line);
    } else {
      await interaction.reply(`Pressing Enter.`);
    }
    await page.keyboard.press('Enter');
	},
};
