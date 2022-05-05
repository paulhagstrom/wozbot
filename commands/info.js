const { SlashCommandBuilder } = require('@discordjs/builders');
// Allow spawning so we can launch the emulator in the container
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Replies with machine info!'),
	async execute(interaction) {
		exec('ls', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
    await interaction.reply('Info!');
	},
};
