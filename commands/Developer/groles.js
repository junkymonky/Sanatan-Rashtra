const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const client = require('../..')


module.exports = {
    name: "groles",
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
            .setCustomId('role_select')
            .setPlaceholder('Gender Roles')
            .addOptions([
                {
                    label: 'Male',
                    description: 'get Male Role',
                    value: '935585306718142464',
                },
                {
                    label: 'Female',
                    description: 'get Female Role',
                    value: '935585526549999707',
                },
            ]),
        )

        message.channel.send({ embeds: [embed], components: [row]})

    }
}
