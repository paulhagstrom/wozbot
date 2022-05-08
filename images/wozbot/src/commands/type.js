const { SlashCommandBuilder } = require('@discordjs/builders');
const { sendline, sendreturn } = require('../interface/type.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!')
    .addStringOption(option => option.setName('line').setDescription('Enter a line to type.')),
	async execute(interaction) {
		const line = interaction.options.getString('line');
    if (line) {
      await interaction.reply(`Type: ${line}`);
			sendline(line);
    } else {
      await interaction.reply(`Hitting return.`);
    }
		sendreturn();
	},
};
