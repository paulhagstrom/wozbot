const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { recordScreen, shootScreen } = require('../interface/show.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Show the screen!'),
	async execute(interaction) {
		await interaction.deferReply();
		await shootScreen();
		const attvid = new MessageAttachment('/tmp/screenshot.jpg');
		const replyEmbed = new MessageEmbed()
			// .setTitle('Current screen')
			.setImage('attachment://screenshot.jpg');
		console.log('Reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed],
			files: [attvid]
		});
		console.log('Reply has gone out.');
		// wait five seconds and then resample the screen and replace the reply
		wait(5000);
		await shootScreen();
		const attvid2 = new MessageAttachment('/tmp/screenshot.jpg');
		const replyEmbed2 = new MessageEmbed()
			// .setTitle('Current screen')
			.setImage('attachment://screenshot.jpg');
		console.log('Edit reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed2],
			files: [attvid2]
		});
		console.log('Edit reply has gone out.');
		// wait five seconds and then resample the screen and replace the reply
		wait(5000);
		await recordScreen();
		const attvid3 = new MessageAttachment('/tmp/screen.gif');
		const replyEmbed3 = new MessageEmbed()
			// .setTitle('Current screen')
			.setImage('attachment://screen.gif');
		console.log('Edit reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed3],
			files: [attvid3]
		});
		console.log('Edit reply has gone out.');
	},
};
