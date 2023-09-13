const { MessageEmbed } = require("discord.js");
const mysql = require("mysql");

module.exports = {
  name: "add",
  description: "Add a word to the blacklist word list",

  run: async (client, message, args) => {

    // Check if the command was used correctly
    if (args.length !== 1) {
      return message.reply("Usage: $add <word>");
    }

    const wordToAdd = args[0];

    // Create a MySQL connection and add the word to the database
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "mommabest@03",
      database: "blacklisted",
    });

    db.connect(function (err) {
      if (err) {
        console.log(err);
        return message.reply("An error occurred while connecting to the database.");
      }

      // Insert the word into the database
      const query = "INSERT INTO blackword (words) VALUES (?)";
      db.query(query, [wordToAdd], (err, result) => {
        if (err) {
          console.log(err);
          return message.reply("An error occurred while adding the word to the blacklist.");
        }

        // Word added successfully
        const successEmbed = new MessageEmbed()
          .setTitle("Word Added")
          .setDescription(`The word "${wordToAdd}" has been added to the blacklist.`)
          .setColor("#2f3035");

        message.channel.send({ embeds: [successEmbed] });
      });
    });
  },
};
