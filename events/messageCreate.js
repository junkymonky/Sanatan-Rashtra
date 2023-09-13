const client = require("../index");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const mysql = require("mysql");

client.on("messageCreate", async (message) => {

  const db = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `mommabest@03`,
    database: `blacklisted`
  });

  db.connect(function(err){
    if (err) {
        console.log(err)
    } else {
      db.query(`SELECT * FROM blackword;`, (err, results) => {
        if (err) {
          return console.log(err);
        } else {
          const blockedWords = results.map((row) => row.words.toLowerCase());
          const msgContent = message.content.toLowerCase();
    
          if (blockedWords.some((word) => msgContent.includes(word))) {
            message.delete();
            message.channel.send({
              embeds: [
                {
                  title: 'Message Deleted',
                  description: `${message.author} your message contained a blacklisted word and has been deleted.\nPlease contact the staff if you feel this is an error.`,
                  color: 16711680,
                },
              ],
            });
          }
        }
      });
  
    }
  })
  


  if (message.content.startsWith("hari bol")) {

    const duong = new MessageEmbed()
      .setDescription("Nitai Gaura Hari Bol!!")
      .setColor("#2f3035")

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Hari Bol")
          .setCustomId('hari')
          .setStyle("PRIMARY")
      )

    message.reply({ embeds: [duong], components: [row] })
  }

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
  
      const embed = new MessageEmbed()
        .setImage("https://i.pinimg.com/736x/6b/ba/31/6bba31984b4eae56369117f9deb192de.jpg")
        .setColor("#2f3035")
        .setDescription(`Hare Krsna ${message.author} 🙏 , in order to access all my commands type \`$help\`. `)

        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("Rules")
            .setURL("https://discord.com/channels/930846075256971285/931569071449849936")
            .setStyle("LINK")
        )
  
      message.channel.send({ embeds: [embed], components: [row] });
  
    }



    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);


});
