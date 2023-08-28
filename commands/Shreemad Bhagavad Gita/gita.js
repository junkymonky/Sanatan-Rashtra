// ... (Previous code remains unchanged)
const axios = require('axios');
const cheerio = require('cheerio');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../../index");

var images = [
  // ... (Images array remains unchanged)
      "https://bhagavadgita.io/static/images/gita/bhagavadgita-6.jpg",
      "https://www.krishnatemple.com/wp-content/uploads/2022/04/Festival_Gita_Jayanti.jpg",
      "https://www.learner.org/wp-content/uploads/2019/05/invitation-to-world-literature-the-bhagavad-gita-arjuna-and-krishna-blow-battle-horns.jpg",
      "https://www.teahub.io/photos/full/202-2024233_the-bhagavad-gita-in-pictures-lord-krishna-and.jpg",
      "https://wallpaperaccess.com/full/4524217.jpg",
      "https://hotyoga.academy/wp-content/uploads/2022/10/Gitta.jpg",
      "https://media.licdn.com/dms/image/C4E12AQGodQsQFc69zA/article-cover_image-shrink_720_1280/0/1616866597415?e=2147483647&v=beta&t=8EnOrDHt-SiHE_V1ipZycE79O-Vey5Xi2SbUlzCuLWE",
      "https://www.iskconbangalore.org/wp-content/uploads/2019/11/bhagavad-gita.jpg",
      "https://www.yogaenred.com/wp-content/uploads/2021/05/Bhagavad-605x454.jpg",
      "https://www.bhagavad-gita.us/wp-content/uploads/2012/10/gita-04.jpg",
      "https://www.bhagavad-gita.us/wp-content/uploads/2012/09/gita-102.jpg",
      "https://www.bhagavad-gita.us/wp-content/uploads/2012/09/gita-103.jpg",
      "https://wallpaperaccess.com/full/658594.jpg",
      "https://wallpaperaccess.com/full/658547.jpg",
      "https://qph.cf2.quoracdn.net/main-qimg-2fb1e238e87fc3d2f76cf052d6dbeae8-lq",
      "https://ratiwrites.files.wordpress.com/2020/09/rahu-ketu.jpg?w=550&h=457",
      "https://cdn.shopify.com/s/files/1/1328/9161/articles/Importance-of-shankha.jpg?v=1480137593",
      "https://qph.cf2.quoracdn.net/main-qimg-7e5816f66ccdb528c1a4331699fcf3f3-lq",
      "https://cdn.discordapp.com/attachments/944686853708189716/1133530787736735814/Fv7DtylXoAExWgy.jpg",
      "https://cdn.discordapp.com/attachments/944686853708189716/1133922248399519774/Krsna_and_the_gopas_take_their_lunch.jpg",
      "https://cdn.discordapp.com/attachments/944686853708189716/1133944248136372245/Krsna_the_Enchanter_of_Vrndavana.jpg",
      "https://cdn.discordapp.com/attachments/944686853708189716/1134095476308840528/Krsna_Supreme_Lord_above_the_modes_of_nature.jpg"
];
var image = Math.floor(Math.random() * images.length);

module.exports = {
  name: "gita",
  description: 'Get\'s Specific Shlok from a specific chapter.',
  run: async (client, message, args) => {
    // ... (Rest of your code)
    if (args.length === 0) {
      // Handle case when no arguments are provided
      return message.channel.send("Please provide the chapter number and shlok number.");
    }

    const [chapterNumber, shlokNumber] = args[0].split('.');

    // Validate if the chapterNumber and shlokNumber are valid integers
    if (isNaN(chapterNumber) || isNaN(shlokNumber)) {
      return message.channel.send("Invalid chapter number or shlok number.");
    }

    // Now you can use chapterNumber and shlokNumber variables for further processing
    console.log(`Chapter Number: ${chapterNumber}`);
    console.log(`Shlok Number: ${shlokNumber}`);

    async function sendCommentaryChunks(message, commentary, maxChunkLength) {
      // Split commentary into chunks of maxChunkLength characters or less
      const chunks = [];
      for (let i = 0; i < commentary.length; i += maxChunkLength) {
        chunks.push(commentary.slice(i, i + maxChunkLength));
      }

      // Send each chunk of the commentary in separate embeds
      for (let i = 0; i < chunks.length; i++) {
        const embed = new MessageEmbed()
          .setDescription(chunks[i])
          .setColor("#2f3035");

        if (i === chunks.length - 1) {
          // For the last chunk, add the button components
          const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('finish')
                .setLabel("Exit Commentary Mode")
                .setStyle("DANGER")
            );

          first = await message.channel.send({ embeds: [embed], components: [row] });
          console.log("sent 1st")
        } else {
          second = await message.channel.send({ embeds: [embed] });
          console.log("sent 2nd")
        }
      }
    }

    try {
      // ... (Rest of your code)
      const response = await axios.get(`https://bhagavadgitaapi.in/slok/${chapterNumber}/${shlokNumber}`);
      const response1 = await axios.get(`https://bhagavadgitaapi.in/chapter/${chapterNumber}`);
      // Send the text of the chapter to the channel
      const embed = new MessageEmbed()
        .setTitle(`${response1.data.name}'s Verse number ${response.data.verse}`)
        .addFields(
          { name: `Chapter Number`, value: `${response1.data.chapter_number}` },
          { name: `Number of Verse`, value: `${response.data.verse}` },
          { name: `Shlok`, value: `${response.data.slok}` },
          { name: `Transliteration`, value: `${response.data.transliteration}` }
        )
        .setImage(String([images[image]]))
        .setColor("#2f3035");

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('commentaries')
            .setLabel("All the Commentaries")
            .setStyle("PRIMARY")
        );

      const initialMessage = await message.reply({ content: "Hare Krsna Devotee 🙏", embeds: [embed], components: [row] });

      const filter = (interaction) => interaction.isButton() && interaction.customId === 'commentaries';
      const collector = initialMessage.createMessageComponentCollector({ filter, time: 60000, max: 1 });

      collector.on('collect', async (interaction) => {
        const commentary = `**${response.data.raman.author}'s Interpretation**\n\nEnglish Commentary: ${response.data.raman.et}`;
        const maxChunkLength = 2000;
        await sendCommentaryChunks(initialMessage, commentary, maxChunkLength);
      });

      collector.on('end', () => {
        initialMessage.edit({ components: [] }); // Remove the buttons after the collector ends
      });

      // ... (Rest of your code)
    } catch (error) {
      console.error(error);
    }

    client.on('interactionCreate', async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId=="finish") {
          await first.delete()
          await second.delete()
       
        }
      }
    })
  }
};


// ... (Rest of your code)
