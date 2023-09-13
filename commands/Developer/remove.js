const { MessageEmbed } = require("discord.js");
const mysql = require("mysql");

module.exports = {
  name: "remove",
  description: "remove a word to the blacklist word list",

  run: async (client, message, args) => {

    // Check if the command was used correctly
    if (args.length !== 1) {
      return message.reply("Usage: $remove <word>");
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
      const query = "DELETE FROM blackword WHERE words=(?);";
      db.query(query, [wordToAdd], (err, result) => {
        if (err) {
          console.log(err);
          return message.reply("An error occurred while adding the word to the blacklist.");
        }

        // Word added successfully
        const successEmbed = new MessageEmbed()
          .setTitle("Word Removed")
          .setDescription(`The word "${wordToAdd}" has been removed from blacklist.`)
          .setColor("#2f3035");

        message.channel.send({ embeds: [successEmbed] });
      });
    });
  },
};
