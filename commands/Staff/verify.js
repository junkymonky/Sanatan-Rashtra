const { MessageEmbed, Discord, MessageActionRow} = require('discord.js')

module.exports = {
    name: "verify",
    descryption: "Verifies new members",

    run: async (client, message, args) => {

        const member = message.mentions.members.first()
        member.roles.add("934894196563783780")
        member.roles.add("930866968393809950")
        message.channel.send({content: "Verified"})


        const welc = new MessageEmbed()
        .setTitle("Verified!!")
        .setDescription(`${member} is verified !! welcome \n Kindly check <#931569071449849936> and <#931137564495212545>`)
        .setColor("#2f3035")
        .setImage("https://i.pinimg.com/564x/c4/7a/cd/c47acdecd7f0bd2c576cb5c812f00edf.jpg")

        const logging = client.channels.cache.get("930846075256971288");

        logging.send({ content: "Hare Krsna Devotee", embeds: [welc]})
    }
}