const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { recordScreen, shootScreen } = require('../interface/show.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Show the screen!'),
	async execute(interaction) {
		await interaction.deferReply();
		// Take 4 screenshots 1 second apart
		// then make an animated gif
		const screenshotInfo = {};
		for (let i = 0; i < 1; i++) {
			await shootScreen();
			screenshotInfo.file = new MessageAttachment('/tmp/screenshot.jpg');
			screenshotInfo.embed = new MessageEmbed()
				.setImage('attachment://screenshot.jpg');
			console.log('Reply is going out.');
			await interaction.editReply({
				embeds: [screenshotInfo.embed],
				files: [screenshotInfo.file]
			});
			console.log('Reply has gone out.');
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
		await recordScreen();
		screenshotInfo.file = new MessageAttachment('/tmp/screen.gif');
		screenshotInfo.embed = new MessageEmbed()
			.setImage('attachment://screen.gif');
		console.log('Edit reply is going out.');
		await interaction.editReply({
			embeds: [screenshotInfo.embed],
			files: [screenshotInfo.file]
		});
		console.log('Edit reply has gone out.');
	},
};
