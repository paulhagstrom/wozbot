const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

// Allow spawning so we can launch the emulator in the container
const { execSync } = require('child_process');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Show the screen!'),
	async execute(interaction) {
		await interaction.deferReply();
		console.log('Running ffmpeg to record');
		// record 1 second and send it out as a gif
		execSync('ffmpeg -y -f x11grab -r 12 -video_size 1128x768 -i :1.0+12,48 -t 1 /tmp/screen.gif', (error, stdout, stderr) => {
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
		// console.log('Running ffmpeg to re-encode');
		// // ensmallen it
		// execSync('ffmpeg -y -i /tmp/screen.mp4 -r 12 -s 800x600 /tmp/screen.gif', (error, stdout, stderr) => {
		// 	if (error) {
		// 		console.log(`error: ${error.message}`);
		// 		return;
		// 	}
		// 	if (stderr) {
		// 		console.log(`stderr:${stderr}`);
		// 		return;
		// 	}
		// 	console.log(`stdout: ${stdout}`);
		// });

		const attvid = new MessageAttachment('/tmp/screen.gif');
		const replyEmbed = new MessageEmbed()
			.setTitle('Current screen')
			.setImage('attachment://screen.gif');
		console.log('Reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed],
			files: [attvid]
			// files: [attpng, attvid]
		});
		console.log('Reply has gone out.');
	},
};
