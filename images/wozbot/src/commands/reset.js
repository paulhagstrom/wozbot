const { SlashCommandBuilder } = require('@discordjs/builders');
const { execSync } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('(Re)boots the machine!'),
	async execute(interaction) {
		await interaction.deferReply();
		// kill old one
		execSync('pkill -f izapple2sdl_linux', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
		});
		// launch new one
		execSync('/usr/src/emulator/izapple2sdl_linux disks/uwgp.dsk &', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
		});
		await interaction.editReply('CHUNKA CHUNKA CHUNKA!');
	},
};
