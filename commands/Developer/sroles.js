const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const client = require('../..')


module.exports = {
    name: "sroles",
    description: "self role",

    run: async (client,message,args) => {

        const embed = new MessageEmbed()
        .setTitle("Choose your Sampradaya (sect)")
        .setDescription("   ")
        .setColor("#2f3035")
        .setImage("https://i.redd.it/qf03j1m2yfp71.png")

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('role_select')
            .setPlaceholder('Gender Roles')
            .addOptions([
                {
                    label: 'Vaishnava',
                    description: 'get Vaishnava Role',
                    value: '935583752699146360',
                },
                {
                    label: 'Shaiva',
                    description: 'get Shaiva Role',
                    value: '935584858795831366',
                },
                {
                    label: 'Shakta',
                    description: 'get Shakta Role',
                    value: "935583805610295376"
                },
                {
                    label: 'Iskcon',
                    description: 'get Iskcon Role',
                    value: "935584950143574066"
                },
                {
                    label: 'Arya Samaj',
                    description: 'get Arya Samaj Role',
                    value: "935585016069619712"
                },
                {
                    label: 'Smarth',
                    description: 'get Smarth role',
                    value: "935585210840543282"
                }
            ]),
        )

        message.channel.send({ embeds: [embed], components: [row]})

    }
}

