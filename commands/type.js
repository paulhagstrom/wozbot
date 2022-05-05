const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!'),
	async execute(interaction) {
		await interaction.reply('Type!');
	},
};
