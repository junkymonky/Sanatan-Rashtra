const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "ship",
  description: "check your relationship with lord krsna!!",

  run: async (client, message, args) => {

    const user = message.mentions.users.first() || message.author

    const embed = new MessageEmbed()
    .setTitle("Shipping...")
    .setDescription(`Shipping ${user} and Lord Krsna`)
    .setThumbnail("https://i.pinimg.com/564x/10/18/05/101805d27fc0390c6c04852ca292081e.jpg")
    .setColor("#2f3035")

    const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('ship')
          .setLabel("click me to check results :)")
          .setStyle("PRIMARY")

        );

    
    message.channel.send({content: "Hare Krsna Devotee 🙏", embeds: [embed], components: [row]})

    client.on('interactionCreate', async (interaction) => {
      if (interaction.customId == "ship") {
        const shipping = new MessageEmbed()
        .setTitle("Shipped!!")
        .setDescription(`Shipped ${user} and Lord Krsna`)
        .setThumbnail("https://i.pinimg.com/564x/e7/0d/9e/e70d9e24deef2a2ae83a81f940f8ed00.jpg")
        .addFields(
          { name: ' ', value: '🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥 100%' },
          { name: '**Murkh** Krsna Loves you ', value: ' ' },
        )

        const row1 = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('nig')
          .setLabel("❤️")
          .setStyle("PRIMARY")
          .setDisabled(true)

        );
    
        interaction.update({content: "Hare Krsna Devotee 🙏", embeds: [shipping], components: [row1]})
      }
     

    })
    
  }
}

