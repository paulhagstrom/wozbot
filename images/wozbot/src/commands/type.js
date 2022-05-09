const { SlashCommandBuilder } = require('@discordjs/builders');
const { sendLine, sendReturn } = require('../interface/type.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('type')
		.setDescription('Types a line into the machine and hits return!')
    .addStringOption(option => option.setName('line').setDescription('Enter a line to type.')),
	async execute(interaction) {
    const line = interaction.options.getString('line');
    if (line) {
      await interaction.reply(`Type! ${line}`);
      sendLine(line);
    } else {
      await interaction.reply(`Pressing Enter.`);
    }
    sendReturn();
	},
};
