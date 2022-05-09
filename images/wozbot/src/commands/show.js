const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { recordScreen } = require('../interface/show.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Show the screen!'),
	async execute(interaction) {
		await interaction.deferReply();
		recordScreen();

		const attvid = new MessageAttachment('/tmp/screen.gif');
		const replyEmbed = new MessageEmbed()
			.setTitle('Current screen')
			.setImage('attachment://screen.gif');
		console.log('Reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed],
			files: [attvid]
		});
		console.log('Reply has gone out.');
	},
};
