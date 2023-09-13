const { Discord, MessageEmbed} = require("discord.js")

module.exports = {
    name: "test",

    run: async (client, message, args ) => {
        const member = message.mentions.members.first()
        const welccome = new MessageEmbed()
        .setTitle("**स्वागतम्‌**")
        .setDescription(`तव‌ स्वागतम् अस्माकम् वितारके।तव‌ स्वागतम् अस्माकम् वितारके ${member}।  वयम्स्मः सनातनधर्मस्य प्रचारक समूहः।\n\n<:arrow:1101151177783132272> कर्तुम् अनुसरणन्नियमानाम् <#1099756050812502056> अस्य अश्नातुम्प्रवासम् पश्यानि। \n\n <:bhagwa:1101149966904336454>॥ नमामि श्रीरामम् सनातनधर्मञ्च ॥<:bhagwa:1101149966904336454>`)
        .setImage("https://cdn.discordapp.com/attachments/1099743839297745007/1101145722021224448/a4d47465c737038ead095518c8831a7a.png")
        .setColor("#ff9933")
        
        message.channel.send({content: `${member} Radhe Radhe`,embeds: [welccome]})
    }
}