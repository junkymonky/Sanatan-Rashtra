 ## Bhagavad Gita Bot

This bot will read and respond to chat messages in a Discord server. It uses the `discord.js` library to connect to the Discord API, and the `axios` library to make HTTP requests to the Bhagavad Gita API.

### Installation

1. Clone this repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file in the root directory of the project and add your Discord bot token to it.
4. Run the bot with `node index.js`.

### Usage

The bot will respond to the following commands:

* `$help`: Displays a list of all commands.
* `$quote`: Gets a random quote from the Bhagavad Gita.
* `$chapter`: Gets a specific chapter from the Bhagavad Gita.
* `$verse`: Gets a specific verse from the Bhagavad Gita.

### Code Explanation

The code is divided into three files:

* `handler/index.js`: This file is responsible for loading the commands and events.
* `index.js`: This file is the main entry point of the bot.
* `config.json`: This file contains the bot's configuration.

The `handler/index.js` file uses the `glob` library to load all of the commands and events from the `commands/` and `events/` directories, respectively. The `index.js` file then uses the `Client` class from the `discord.js` library to connect to the Discord API. The `config.json` file contains the bot's configuration, such as its token and the ID of the server it should join.

### Conclusion

This bot is a simple example of how to use the `discord.js` and `axios` libraries to create a Discord bot. It can be used to learn more about the Bhagavad Gita or simply to have some fun.