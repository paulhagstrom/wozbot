const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
// Allow spawning so we can launch the internal http server
const { exec } = require('child_process');
// Puppeteer for controlling headless browser
const { puppeteer } = require('puppeteer');
const Keyv = require('Keyv');

// launch the http server for the static js emulator
exec('usr/src/bot/node_modules/http-server/bin/http-server /usr/src/emulator', (error, stdout, stderr) => {
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

// launch a headless browser
(async() => {
	const browser = await puppeteer.launch();
	const browserWSEndpoint = browser.wsEndpoint();
	// start the emulator
	const page = await browser.newPage();
	await page.goto('http://localhost/apple2js.html#ugwp');
	browser.disconnect();
	// save the wsEndpoint
	const keyv = Keyv.new();
	keyv.put('browserWSEndpoint', browserWSEndpoint);
})

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
