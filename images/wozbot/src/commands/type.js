const { SlashCommandBuilder } = require('@discordjs/builders');
// Allow spawning so we can launch the xdotool to type
const { execSync } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!')
    .addStringOption(option => option.setName('line').setDescription('Enter a line to type.')),
	async execute(interaction) {
		const line = interaction.options.getString('line');
    if (line) {
      await interaction.reply(`Type: ${line}`);
			// type the line
			execSync(`xdotool search --name Apple type --delay 100 ${line}`, (error, stdout, stderr) => {
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
    } else {
      await interaction.reply(`Hitting return.`);
    }
		// hit return
		execSync('xdotool search --name Apple key Return', (error, stdout, stderr) => {
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
},
};
