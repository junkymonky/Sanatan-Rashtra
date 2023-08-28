const client = require("../index");
const {MessageEmbed} = require("discord.js")

client.on("ready", async ()  => {
  console.log(`${client.user.tag} is up and ready to go!`)
  client.user.setActivity("ALL MY DEVOTEES", { type: 'WATCHING' })

  const logchan = await client.channels.cache.get('979261005559394304');

  logchan.send({ content: "<@1119259930503946322> Hare Krsna, I'm online "})

})
  



