const { MessageEmbed, MessageActionRow, MessageButton, Discord } = require('discord.js')
const client = require('../..')

module.exports = {
    name: "ticket",
    
    run: async (client, message, args) => {

        const tic = new MessageEmbed()
        .setTitle("Open a Ticket")
        .addFields(
            {name: `**English**`, value: `Hare Krsna devotee 🙏, Please open a ticket if you have any problems with our server or want to report someone for breaking the rules. If you want to vent or if you're losing faith in the gods and goddesses of Sanatan Dharm, you can open a ticket. Our team will assist you.`},
            {name: `**Sanskrit**`, value: `हरे कृष्ण भक्त 🙏, पत्त्रेन् कश्चिदपि समस्यायाः भक्तिहननस्य नियमभङ्गस्य च सन्दर्भे अस्माकम् अलिङ्गे सह अभिमृशानि।`}
        )
        .setColor("#ff9933")
        .setImage("https://i.pinimg.com/564x/d9/e5/3d/d9e53d864dfba1468affbb715b5b6284.jpg")



    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setEmoji('🎟️')
        .setCustomId('open')
        .setLabel('Open a ticket')
        .setStyle('PRIMARY')
    );

    message.channel.send({ embeds: [tic], components: [row]})
        
    }
}