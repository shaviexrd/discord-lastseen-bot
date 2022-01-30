const settings = require("../configs/settings.json");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");



/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
	const prefix = settings.GenelAyarlar.prefix.find((x) => message.content.toLowerCase().startsWith(x));
	if (message.author.bot || !message.guild || !prefix) return;
	let args = message.content.substring(prefix.length).trim().split(" ");
	const commandName = args[0].toLowerCase();

	args = args.splice(1);

	const cmd = client.commands.get(commandName) || client.commands.array().find((x) => x.conf.aliases && x.conf.aliases.includes(commandName));

	cmd.run(client, message, args); 
};

module.exports.conf = {
	name: "message"
};
