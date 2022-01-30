const { Discord, Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
const ayar = require("./src/configs/settings.json");
const moment = require("moment");

client.commands = new Collection();

require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
  
client
  .login(ayar.GenelAyarlar.Token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));

client.on('ready', async () => {
    client.user.setPresence({ activity: { name: settings.GenelAyarlar.BotDurum }, status: "online" });
    client.channels.cache.get(settings.GenelAyarlar.BotSesKanali).join();
});

client.zaman = value => {
        const days = Math.floor(value / 86400000);
        value = value % 86400000;
        const hours = Math.floor(value / 3600000);
        value = value % 3600000;
        const minutes = Math.floor(value / 60000);
        value = value % 60000;
        const seconds = Math.floor(value / 1000);
        return (days ? days + ' gün ' : '') + (hours ? hours + ' saat ' : '') + (minutes ? minutes + ' dakika ' : '') + (seconds ? seconds + ' saniye' : '')
    };
