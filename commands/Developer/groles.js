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