const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases : ['av'],
  description: "sends user avatar",

  run: async (client, message, args) => {
     const user =
      message.mentions.members.first() || message.author || 
      message.guild.members.cache.get(args[0]) 

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("DYNAMIC")
          .setStyle("LINK")
          .setURL(user.displayAvatarURL({ dynamic: true, size: 4096 })),
        new MessageButton()
          .setLabel("PNG")
          .setStyle("LINK")
          .setURL(user.displayAvatarURL({ format: "png", size: 4096 })),
        new MessageButton()
          .setLabel("JPG")
          .setStyle("LINK")
          .setURL(user.displayAvatarURL({ format: "jpg", size: 4096 })),
        new MessageButton()
          .setLabel("JPEG")
          .setStyle("LINK")
          .setURL(user.displayAvatarURL({ format: "jpeg", size: 4096 })),
        new MessageButton()
          .setLabel("WEBP")
          .setStyle("LINK")
          .setURL(user.displayAvatarURL({ format: "webp", size: 4096 }))


      )

      const embed = new MessageEmbed()
      .setDescription(`**${user}\'s avatar !!**`)
      .setColor("#000000")
      .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))

      return message.channel.send({ embeds: [embed], components: [row] });
  }
}