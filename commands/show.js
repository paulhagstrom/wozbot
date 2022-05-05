const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

// Allow spawning so we can launch the emulator in the container
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Show the screen!'),
	async execute(interaction) {
		// record 1 second
		exec('ffmpeg -y -hide_banner -loglevel warning -draw_mouse 0 -f x11grab -r 30 -video_size 850x630 -i :99+100,70 -q:v 0 -pix_fmt yuv422p -t 1 screen.mp4', (error, stdout, stderr) => {
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
		/*
		// ensmallen it
		exec('ffmpeg -loglevel warning -y -i screen.mp4 -vcodec libx264 -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -pix_fmt yuv420p -strict experimental -r 30 -t 2:20 -acodec aac -vb 1024k -minrate 1024k -maxrate 1024k -bufsize 1024k -ar 44100 -ac 2 screen_small.mp4', (error, stdout, stderr) => {
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
		*/
		const file = new MessageAttachment('./demo.mp4');
		const replyEmbed = new MessageEmbed()
			.setTitle('Camera noise')
			.setImage('attachment://demo.mp4');
		await interaction.reply({
			embeds: [replyEmbed],
			files: [file]
		});
	},
};