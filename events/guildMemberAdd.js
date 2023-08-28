const client = require("../index");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

/*client.on('guildMemberAdd', async member => {
    console.log(`a user joins a guild: ${member.user.tag}`);
    const logging = client.channels.cache.get("935230618005041222");
    const log = new MessageEmbed()
    .setTitle("Joined!")
    .setDescription(`${member.user.tag} just joined the server`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

    logging.send({embeds: [log]})
    const welc = client.channels.cache.get("1099756476697944085")
    const welccome = new MessageEmbed()
    .setTitle("**स्वागतम्‌**")
    .setDescription(`तव‌ स्वागतम् अस्माकम् वितारके।तव‌ स्वागतम् अस्माकम् वितारके <@${member.user.id}>।  वयम्स्मः सनातनधर्मस्य प्रचारक समूहः।\n\n<:arrow:1101151177783132272> कर्तुम् अनुसरणन्नियमानाम् <#1099756050812502056> अस्य अश्नातुम्प्रवासम् पश्यानि। \n\n <:bhagwa:1101149966904336454>॥ नमामि श्रीरामम् सनातनधर्मञ्च ॥<:bhagwa:1101149966904336454>`)
    .setImage("https://cdn.discordapp.com/attachments/1099743839297745007/1101145722021224448/a4d47465c737038ead095518c8831a7a.png")
    .setColor("#ff9933")

    welc.send({content: `<@${member.user.id}> Radhe Radhe`,embeds: [welccome]})



});*/