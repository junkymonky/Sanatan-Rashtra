const { MessageEmbed, MessageActionRow, MessageButton, Discord } = require('discord.js')
const client = require('../..')

module.exports = {
    name: "vticket",
    
    run: async (client, message, args) => {

        const tic = new MessageEmbed()
        .setTitle("Open a Ticket")
        .addFields(
            {name: `**English**`, value: `Hare Krsna devotee 🙏, Greetings from our server! Please click the Open Ticket button to gain access to the server. `},
            {name: `**Sanskrit**`, value: `हरे कृष्ण भक्त 🙏,अस्माकं सर्वरेण अभिवादनम् कृपया सर्वरं प्रति प्रवेशं प्राप्तुं Open Ticket बटनं क्लिक् कुर्वन्तु।`}
        )
        .setColor("#ff9933")
        .setImage("https://i.pinimg.com/564x/d9/e5/3d/d9e53d864dfba1468affbb715b5b6284.jpg")



    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setEmoji('🎟️')
        .setCustomId('vopen')
        .setLabel('Open Ticket')
        .setStyle('PRIMARY')
    );

    message.channel.send({ embeds: [tic], components: [row]})
        
    }
}