const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: "roles",
    description: "self role",

    run: async (client,message,args) => {

        const embed = new MessageEmbed()
        .setTitle("Choose Your Gender")
        .setDescription("   ")
        .setColor("#2f3035")
        .setImage("https://i.pinimg.com/564x/99/fc/2d/99fc2dd201eea7b085e964ad01105f99.jpg")

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('male')
        )

        message.channel.send({ embeds: [embed], components: [row]})

    }
}