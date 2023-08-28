const axios = require('axios');
const cheerio = require('cheerio');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'summary',
    description: 'Get a chapter summary from the Bhagavad Gita.',
    run: async(client, message) => {

        var images = [
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

        ]
        var image = Math.floor(Math.random() * images.length);

        const args = message.content.split(' ');

        if (args.length === 2 && !isNaN(args[1])) {
          const chapterNumber = args[1];
    
          try {
            // Make a GET request to the Bhagavad Gita API to retrieve the text of the chapter
            const response = await axios.get(`https://bhagavadgitaapi.in/chapter/${chapterNumber}`);
            // Send the text of the chapter to the channel
            const embed = new MessageEmbed()
            .setTitle(`${response.data.name}`)
            .addFields(
                {name: `Chapter Number`, value: `${response.data.chapter_number}`},
                {name: `Number of Verses`, value: `${response.data.verses_count}`},
                {name: `Translation`, value: `${response.data.translation}`},
                {name: `Transliteration`, value: `${response.data.transliteration}`},
                {name: `Summary`, value: `**English**▶️ ${response.data.summary.en}`},
               // {name: `Summary`, value: `**Hindi**:▶️ ${response.data.summary.hi}`}
            )
            .setImage(String([images[image]]))
            .setColor("#2f3035")
           message.channel.send({content: "Hare Krsna devotee 🙏", embeds: [embed]});
          } catch (error) {
            console.error(error);
          }
        }
    },
};
