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
                }
            ]),
        )

        message.channel.send({ embeds: [embed], components: [row]})

    }
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'role_select') {
        const selectedRole = interaction.values[0]; // Assuming only one value is selected
        const role = interaction.guild.roles.cache.find(role => role.id === selectedRole);

        if (role) {
            const member = interaction.guild.members.cache.get(interaction.user.id);

            if (member.roles.cache.has(role.id)) {
                member.roles.remove(role);
                await interaction.reply({ content: `You have been removed from the ${role.name} role.` });
            } else {
                member.roles.add(role);
                await interaction.reply({ content: `You have been given the ${role.name} role.` });
            }
        } else {
            await interaction.reply({ content: 'Role not found.', ephemeral: true });
        }
    }
});