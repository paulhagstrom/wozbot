const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

// Allow spawning so we can launch the emulator in the container
const { execSync } = require('child_process');
// const Keyv = require('keyv');
const puppeteer = require('puppeteer');
// const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const fs = require('fs');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show')
		.setDescription('Show the screen!'),
	async execute(interaction) {
		await interaction.deferReply();
		const browserWSEndpoint = fs.readFileSync('/tmp/a2js-ws');
		// const browserWSEndpoint = require('/tmp/a2js-ws');
		// const keyv = new Keyv();
		// const browserWSEndpoint = await keyv.get('browserWSEndpoint');
		console.log(`show: retrieved browser endpoint: ${browserWSEndpoint}`);
		const browser = await puppeteer.connect({ browserWSEndpoint });
		const pages = await browser.pages();
		const page = pages[0];
		/*
		const Config = {
			followNewTab: true,
			fps: 25,
			ffmpeg_Path: '/usr/bin/ffmpeg',
			videoFrame: {
				width: null,
				height: null,
			},
			aspectRatio: '4:3',
			recordDurationLimit: 1,
		};
		console.log('Recording starting.');
		const recorder = new PuppeteerScreenRecorder(page, Config);
		const SavePath = '/tmp/screen.mp4';
		await recorder.start(SavePath);
		// wait 1 second
		await wait(1000);
		await recorder.stop();
		console.log('Recording stopped.');
		*/
		// await page.screenshot({path:'/tmp/screen.png'});
		// 8fps, 16 frames
		for (let frame = 1; frame <= 8; frame++) {
			await page.screenshot({path:`/tmp/screen${frame}.png`});
			wait(125);
		}
		// use ffmpeg to make a looping gif
		execSync('ffmpeg -y -f image2 -framerate 8 -i /tmp/screen%d.png -loop 0 /tmp/screen.gif');
		// await page.screenshot({
		// 	path: 'screen.png'
		// });
		// record 1 second
		/*
		exec('ffmpeg -y -hide_banner -loglevel warning -draw_mouse 0 -f x11grab -r 30 -video_size 850x630 -i :20+100,70 -q:v 0 -pix_fmt yuv422p -t 1 screen.mp4', (error, stdout, stderr) => {
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
		// const attvid = new MessageAttachment('/tmp/screen.mp4');
		const attvid = new MessageAttachment('/tmp/screen.gif');
		// const attpng = new MessageAttachment('/tmp/screen.png');
		const replyEmbed = new MessageEmbed()
			.setTitle('Current screen')
			.setImage('attachment://screen.gif');
			// .setImage('attachment://screen.png');
			// .setImage('attachment://screen.mp4');
		console.log('Reply is going out.');
		await interaction.editReply({
			embeds: [replyEmbed],
			files: [attvid]
			// files: [attpng, attvid]
		});
		console.log('Reply has gone out.');
	},
};
