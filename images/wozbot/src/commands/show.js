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
		// record 1 second
		execSync('ffmpeg -y -hide_banner -loglevel warning -draw_mouse 0 -f x11grab -r 30 -video_size 1152x864 -i :1.0 -q:v 0 -pix_fmt yuv422p -t 1 /tmp/screen.mp4', (error, stdout, stderr) => {
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
		console.log('Running ffmpeg to re-encode');
		// ensmallen it
		execSync('ffmpeg -y -i /tmp/screen.mp4 -r 12 -s 800x600 /tmp/screen.gif', (error, stdout, stderr) => {
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

		const attvid = new MessageAttachment('/tmp/screen_small.gif');
		const replyEmbed = new MessageEmbed()
			.setTitle('Current screen')
			.setImage('attachment://screen_small.gif');
		console.log('Reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed],
			files: [attvid]
			// files: [attpng, attvid]
		});
		console.log('Reply has gone out.');
	},
};
