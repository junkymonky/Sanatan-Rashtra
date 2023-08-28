const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "rules",

    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle("**You all must follow the following rules to stay in this server.**")
        .setDescription(`1)-Dont harass someone \n\n 2)-Dont disrespect or abuse someone until and unless the person abuse. \n\n 3)Respect of women is must or be ready to get kicked or banned. \n\n 4)-No Racism, Criticism, Sexism or any sort of discrimination \n\n 5)-No one is superior, If you see a mod abusing his/her role, Complain to the owner or some person above them. \n\n 6)-Respect everyone's sampradaya.\n\n 7)-No dev ninda \n\n 8) o hate speech will be tolerated here; the whole reason for which this server was created was to promote unity and not hate. So, if you have any questions feel free to dm <@744641203517128824> or the other mods but **NO HATE SPEECH**. \n\n 9) No Hate towards any Sanatani Organisations.`)
        .setColor("#2f3035")
        .setImage("https://i.pinimg.com/564x/0a/92/6b/0a926b7b15102b6f426d6257c9002141.jpg")

        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('rule')
            .setLabel('Click me')
            .setStyle('PRIMARY')
        );    

        message.channel.send({embeds: [embed], components: [row]})
    } 
}