const { SlashCommandBuilder } = require('@discordjs/builders');
// Allow spawning so we can launch the emulator in the container
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		// kill old one
		exec('pkill -f linapple', (error, stdout, stderr) => {
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
		// launch new one
		exec('linapple -1 disks/uwgp.dsk &', (error, stdout, stderr) => {
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
		await interaction.reply(`CHUNKA CHUNKA CHUNKA! {$pid}`);
	},
};
