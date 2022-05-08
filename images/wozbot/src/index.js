const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { exec } = require('child_process');

// Puppeteer for controlling headless browser
// const puppeteer = require('puppeteer');

// puppeteer speedup: https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/
// const minimal_args = [
//   '--autoplay-policy=user-gesture-required',
//   '--disable-background-networking',
//   '--disable-background-timer-throttling',
//   '--disable-backgrounding-occluded-windows',
//   '--disable-breakpad',
//   '--disable-client-side-phishing-detection',
//   '--disable-component-update',
//   '--disable-default-apps',
//   '--disable-dev-shm-usage',
//   '--disable-domain-reliability',
//   '--disable-extensions',
//   '--disable-features=AudioServiceOutOfProcess',
//   '--disable-hang-monitor',
//   '--disable-ipc-flooding-protection',
//   '--disable-notifications',
//   '--disable-offer-store-unmasked-wallet-cards',
//   '--disable-popup-blocking',
//   '--disable-print-preview',
//   '--disable-prompt-on-repost',
//   '--disable-renderer-backgrounding',
//   '--disable-setuid-sandbox',
//   '--disable-speech-api',
//   '--disable-sync',
//   '--hide-scrollbars',
//   '--ignore-gpu-blacklist',
//   '--metrics-recording-only',
//   '--mute-audio',
//   '--no-default-browser-check',
//   '--no-first-run',
//   '--no-pings',
//   '--no-sandbox',
//   '--no-zygote',
//   '--password-store=basic',
//   '--use-gl=swiftshader',
//   '--use-mock-keychain',
// 	// adding this one to avoid docker problems running as root
// 	'--disable-setuid-sandbox',
// ];

// launch a headless browser
console.log('launching izapple2.');
exec('/usr/src/emulator/izapple2sdl_linux /usr/src/bot/disks/uwgp.dsk &', (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			if (stderr) {
				console.log(`stderr:${stderr}`);
			}
			console.log(`stdout: ${stdout}`);
		});

// (async() => {
// 	const browser = await puppeteer.launch({
// 		headless: true,
// 		userDataDir: '/tmp/puppeteer',
// 		args: minimal_args
// 	});
// 	const browserWSEndpoint = browser.wsEndpoint();
// 	console.log(`browser endpoint: ${browserWSEndpoint}`);
// 	// start the emulator
// 	const page = await browser.newPage();
// 	await page.goto('http://apple2js:8080/cyaniide.html?disk1=disks/dos.dsk');
// 	// await page.goto('http://apple2js:8080/apple2js.html#dos33master');
// 	// go full screen
// 	//await page.keyboard.down('Shift');
// 	//await page.keyboard.press('F2');
// 	browser.disconnect();
// 	// save the wsEndpoint
// 	fs.writeFile('/tmp/a2js-ws', browserWSEndpoint, err => {
// 		if (err) console.error(err);
// 	});
// 	// const keyv = new Keyv();
// 	// await keyv.set('browserWSEndpoint', browserWSEndpoint);
// })();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch(error) {
		console.error(error);
		await interaction.reply({content: '?SYNTAX ERROR', ephemeral: true});
	}

});

// Login to Discord with your client's token
client.login(token);
