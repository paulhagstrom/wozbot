const { SlashCommandBuilder } = require('@discordjs/builders');
// Allow spawning so we can launch the emulator in the container
// const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Replies with machine info!'),
	async execute(interaction) {
    await interaction.reply('Info!');
	},
};
