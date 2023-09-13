const { Client, Collection} = require("discord.js");

const client = new Client({
    intents: 32767,
    
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
const mysql = require("mysql");
// Initializing the project
require("./handler")(client);

const db = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `mommabest@03`,
    database: `blacklisted`

})

db.connect(function(err){
    if (err) {
        console.log(err)
    } else {
        console.log("connect hogya database se")

    }
})

client.login(client.config.token);
