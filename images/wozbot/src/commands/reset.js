const { SlashCommandBuilder } = require('@discordjs/builders');
const { stopEmulator, startEmulator } = require('../interface/show.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		await interaction.deferReply();
		await stopEmulator();
		await startEmulator();
		await interaction.editReply('CHUNKA CHUNKA CHUNKA!');
	},
};
