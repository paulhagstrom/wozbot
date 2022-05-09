const { SlashCommandBuilder } = require('@discordjs/builders');
const { stopEmulator, startEmulator } = require('../interface/reset.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		await interaction.deferReply();
		stopEmulator();
		startEmulator();
		await interaction.editReply('CHUNKA CHUNKA CHUNKA!');
	},
};
