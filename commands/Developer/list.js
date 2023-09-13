const { MessageEmbed, Discord } = require("discord.js");

const mysql = require("mysql");

module.exports = {
    name: "list",
    description: "shows a list of all the censored words",

    run: async (client, message, args ) => {

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
              
              db.query(`SELECT*FROM blackword;`, (err, result) => {
                if (err) {
                  return console.log(err)
                } else {
                  const blacklistedWords = result.map((row) => row.words).join(', '); // Join all words with a comma
                  const allWordsEmbed = new MessageEmbed()
                    .setTitle("Here are all blacklisted words")
                    .setDescription(blacklistedWords)
                    .setColor("#2f3035");
                  message.channel.send({ embeds: [allWordsEmbed] });
                 
                }
              })
               
            }

        })
        
    }
}