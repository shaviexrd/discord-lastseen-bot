const settings = require("../configs/settings.json");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
moment.locale("tr")
const Database = require("../models/Data")
/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
module.exports = async (oldUser, newUser) => {
const situation = Object.keys(newUser.user.presence.clientStatus)
const embed = new MessageEmbed()
let date = `${moment(Date.now()).format("DD")} ${moment(Date.now()).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${moment(Date.now()).format("YYYY")} ${moment(Date.now()).format("HH:mm")}`;

if(situation.find(x => x === "web") || situation.find(x => x === "desktop") || situation.find(x => x === "mobile")) 
{
	if(settings.LogKanallari.SonGörülmeLog) client.channels.cache.get(settings.LogKanallari.SonGörülmeLog).send(embed.setDescription(`<@${newUser.user.id}> adlı kullanıcı ${date} tarihinde giriş yaptı!`))

} else {
	if(settings.LogKanallari.SonGörülmeLog) client.channels.cache.get(settings.LogKanallari.SonGörülmeLog).send(embed.setDescription(`<@${newUser.user.id}> adlı kullanıcı ${date} tarihinde çıkış yaptı!`))
	const Data = new Database({
		userID: newUser.user.id,
		time: `${date}`
	}).save().catch(e => console.error(e))
	
}

};

module.exports.conf = {
	name: "presenceUpdate"
};
