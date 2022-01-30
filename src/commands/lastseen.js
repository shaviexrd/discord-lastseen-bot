const { MessageEmbed } = require("discord.js");
const settings = require("../configs/settings.json");
const Database = require("../models/Data")
module.exports = {
	conf: {
		aliases: [],
		name: "lastseen",
		help: "lastseen [Üye/ID]",
		enabled: true
	},

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {Array<string>} args
	 * @param {MessageEmbed} embed
	 * @returns {Promise<void>}
	 */
	run: async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(settings.GenelAyarlar.setFooter).setColor("RANDOM").setTimestamp();  
    let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!kullanici) return message.channel.send(embed.setDescription("Geçerli bir üye belirt!")).then(x => x.delete({timeout:10000}));
    Database.find({userID: kullanici.id}, async(err, res) => {
    if(!res) return;
    let x = res.reverse();
    let lastseen = x.map((x) => ` <@${x.userID}> adlı kullanıcı ${x.time} zamanında çıkış yapmış!`).slice(0,1)
    message.channel.send(embed.setDescription(lastseen))
    })
	}
};