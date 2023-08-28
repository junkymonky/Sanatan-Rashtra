const {discord, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const dtembed = require("../../embed.json")
module.exports = {
  name: "serveravatar",
  aliases: ["sav", "guildavatar"],
  category: "info",
  description: "Get avatar of the server",
  run: async (client, message, args) => {
      
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel("DYNAMIC")
        .setStyle("LINK")
        .setURL(message.guild.iconURL({ dynamic: true, size: 4096 })),
      new MessageButton()
        .setLabel("PNG")
        .setStyle("LINK")
        .setURL(message.guild.iconURL({ format: "png", size: 4096 })),
      new MessageButton()
        .setLabel("JPG")
        .setStyle("LINK")
        .setURL(message.guild.iconURL({ format: "jpg", size: 4096 })),
      new MessageButton()
        .setLabel("JPEG")
        .setStyle("LINK")
        .setURL(message.guild.iconURL({ format: "jpeg", size: 4096 })),
      new MessageButton()
        .setLabel("WEBP")
        .setStyle("LINK")
        .setURL(message.guild.iconURL
          ({ format: "webp", size: 4096 }))

    )

    const embed = new MessageEmbed()
      .setDescription(`**Guild's pfp**`)
      .setColor("#000000")
      .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))

      return message.channel.send({ embeds: [embed], components: [row] });
    
    
  }
}