const client = require("../index");
const { MessageEmbed, MessageActionRow, MessageButton, Discord } = require("discord.js")
const axios = require('axios');
const cheerio = require('cheerio');
const { EveryoneRoleId, StaffRoleId, StaffRoleId2, CatergoryID, TrasnscriptID } = require("../ticket.json")
const { createTranscript } = require("discord-html-transcripts")
const fetchAll = require('discord-fetch-all');


client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }


    if (interaction.isButton()) {
        if (interaction.customId === "open") {
          await interaction.deferReply({ ephemeral: true })
          if (interaction.guild.channels.cache.find(e => e.topic == interaction.user.id)) {
            return interaction.followUp({
              content: "***Radhe Radhe*** You already have a ticket open!",
              ephemeral: true
            })
          }
          const channelMade = interaction.guild.channels.create(`${interaction.user.tag} Ticket`, {
            parent: CatergoryID,
            topic: interaction.user.id,
            permissionOverwrites: [{
              id: interaction.user.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }, {
              id: client.user.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }, {
              id: StaffRoleId,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }, {
              id: StaffRoleId2,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }, {
              id: EveryoneRoleId,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }],
            type: "GUILD_TEXT"
          }).then(async c => {
            interaction.followUp({
              embeds: [new MessageEmbed()
                .setColor("#ff9933")
                .setDescription(`<@${interaction.user.id}> You have made a ticket.`)
                .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
                .setAuthor({ name: "Your ticket has been made!", iconURL: `${client.user.displayAvatarURL()}` })
              ], ephemeral: true
            })
            const newtic = new MessageEmbed()
              .setColor("#ff9933")
              .setAuthor({ name: "Sanatan Dharm support!", iconURL: `${interaction.guild.iconURL()}` })
              .setFooter({ text: "Your ticket will be recorded in a transcript", iconURL: `${interaction.user.displayAvatarURL()}` })
              .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
              .addField("To Create A Transcript:", "By pressing on the green button labbeld `Claiming` the channels transcript will be sent here.\n When this ticket is closed too, a copy of this tickets Transcript will be kept also.")
    
            let button1 = new MessageButton()
              .setCustomId("ticket-close")
              .setLabel("Close Ticket")
              .setEmoji("🔒")
              .setStyle("DANGER")
    
            let button2 = new MessageButton()
              .setCustomId("Transcript")
              .setLabel("Transcript")
              .setStyle("SUCCESS")
    
    
            let button4 = new MessageButton()
              .setCustomId("Lock")
              .setLabel("Lock Ticket")
              .setStyle("DANGER")
    
            let button5 = new MessageButton()
              .setCustomId("Unlock")
              .setLabel("Un-Lock Ticket")
              .setStyle("PRIMARY")
    
    
            const row = new MessageActionRow()
              .addComponents(button1, button2, button4, button5)
    
            c.send({
              content: `<@${interaction.user.id}>`,
              embeds: [newtic],
              components: [row]
            }).then(msg => msg.pin())
          })
    
        }
        
      }

      if (interaction.isButton()) {
        if (interaction.customId === "ticket-close") {
    
          auser = interaction.guild.members.cache.get(interaction.channel.topic);
          const StaffPeople = interaction.guild.roles.cache.has(StaffRoleId || StaffRoleId2 || interaction.guild.ownerId)
          if (!interaction.user.id == StaffPeople) {
            interaction.reply({ content: "You do not have permission to close the ticket!", ephemeral: true })
          } else {
    
            interaction.reply({
              embeds: [new MessageEmbed()
                .setColor("#ff9933")
                .setTitle("Ticket will be closed. <a:loading:1101734912115085363>")
                .setDescription("Closing the ticket in 3 seconds...")
                .setAuthor({ name: "Sanatan Dharm support!", iconURL: `${interaction.guild.iconURL()}` })
              ]
            })
            if (((interaction.channel.topic === interaction.user.id)) === interaction.user.id && StaffRoleId && StaffRoleId2 !== interaction.user.id) {
              return interaction.followUp({
                content: `This ticket can only be closed by staff members.`,
                ephemeral: true
              })
            }
            const Trasnscript = await createTranscript(interaction.channel, {
              limit: -1,
              fileName: `${interaction.channel.name}-Ticket-Transcript.html`,
              returnBuffer: false
            });
    
            const allMessages = await fetchAll.messages(interaction.channel, {
        reverseArray: true, // Reverse the returned array
        userOnly: true, // Only return messages by users
        botOnly: false, // Only return messages by bots
        pinnedOnly: false, // Only returned pinned messages
    });
     
    
            const embedClosedTicket = new MessageEmbed()
              .setColor("#ff9933")
              .setDescription(`${auser}'s Ticket has been closed \n\n`)
              .setAuthor({ name: "Sanatan Dharm support!", iconURL: `${interaction.guild.iconURL()}` })
    
            client.channels.cache.get(TrasnscriptID).send({ embeds: [embedClosedTicket], files: [Trasnscript] })
            setTimeout(() => {
              interaction.channel.delete()
            }, 3000)
          }
    
        }
    
      }

      if (interaction.isButton()) {
        if (interaction.customId === "Transcript") {
          const Trasnscript = await createTranscript(interaction.channel, {
            limit: -1,
            fileName: `${interaction.channel.topic}-Ticket-Transcript.html`,
            returnBuffer: false
          });
    
          interaction.reply({ content: `Here is the tickets Transcript! <@${interaction.user.id}>`, files: [Trasnscript] })
        }
      }

      if (interaction.isButton()) {
        if (interaction.customId === "Lock") {
          const archie = new MessageEmbed()
            .setColor("#ff9933")
            .setDescription("<:tehehe:975812900906229820> I have archieved the ticket for further reviewing!")
    
          interaction.reply({ embeds: [archie] })
          auser = interaction.guild.members.cache.get(interaction.channel.topic);
          const StaffPeople = interaction.guild.roles.cache.has(StaffRoleId || StaffRoleId2 || interaction.guild.ownerId)
          if (!interaction.user.id == StaffPeople) {
            interaction.reply({ content: "You do not have permission to close the ticket!", ephemeral: true })
          } else {
            interaction.channel.permissionOverwrites.delete(auser);
            interaction.channel.permissionOverwrites[{
              id: auser,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
            }, {
                id: client.user.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              }, {
                id: StaffRoleId,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              }, {
                id: StaffRoleId2,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              }, {
                id: EveryoneRoleId,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              }]
    
    
    
          }
        }
      }


      if (interaction.isButton()) {
        if (interaction.customId == 'Unlock') {
          await interaction.deferUpdate();
          auser = interaction.guild.members.cache.get(interaction.channel.topic);
    
          const StaffPeople = interaction.guild.roles.cache.has(StaffRoleId || StaffRoleId2 || interaction.guild.ownerId)
          if (!interaction.user.id == StaffPeople) {
            interaction.reply({ content: "You do not have permission to close the ticket!", ephemeral: true })
          } else {
            interaction.channel.permissionOverwrites.delete(auser);
            interaction.channel.permissionOverwrites.set([
              {
                id: client.user.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: StaffRoleId,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: auser,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: StaffRoleId2,
                allow: [Permissions.FLAGS.VIEW_CHANNEL],
              },
              {
                id: EveryoneRoleId,
                deny: [Permissions.FLAGS.VIEW_CHANNEL],
              },
            ]);
    
    
            const open = new MessageEmbed()
              .setColor("#ff9933")
              .setDescription("<:tehehe:975812900906229820> I have un-archieved the ticket!")
    
            interaction.followUp({ embeds: [open] })
    
    
    
          }
        }
      }

      if (interaction.isButton()) {
        if (interaction.customId === "hari") {
          await interaction.reply({ content: 'https://cdn.discordapp.com/attachments/1099743839297745007/1101578193745477702/7d3e20797abe41ffeb105c7a3450b47a.png', ephemeral: true })
        }
      }

      if (interaction.isButton()) {
        if (interaction.customId == "rule") {
          await interaction.reply({ content: "https://tenor.com/view/mmi-rules-mors-mutual-mors-mutual-headquarters-mmi-server-discord-rules-gif-26227971", ephemeral: true})
        }
      }




/*------------------------------verification buttons-------------------------------*/







if (interaction.isButton()) {
  if (interaction.customId === "vopen") {
    await interaction.deferReply({ ephemeral: true })
    if (interaction.guild.channels.cache.find(e => e.topic == interaction.user.id)) {
      return interaction.followUp({
        content: "**Hare Krsna devotee 🙏** You already have a ticket open!",
        ephemeral: true
      })
    }
    const channelMade = interaction.guild.channels.create(`${interaction.user.tag} Ticket`, {
      parent: CatergoryID,
      topic: interaction.user.id,
      permissionOverwrites: [{
        id: interaction.user.id,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      }, {
        id: client.user.id,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      }, {
        id: StaffRoleId,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      }, {
        id: StaffRoleId2,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      }, {
        id: EveryoneRoleId,
        deny: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      }],
      type: "GUILD_TEXT"
    }).then(async c => {
      interaction.followUp({
        embeds: [new MessageEmbed()
          .setColor("#ff9933")
          .setDescription(`<@${interaction.user.id}> You have made a ticket.`)
          .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
          .setAuthor({ name: "Your ticket has been made!", iconURL: `${client.user.displayAvatarURL()}` })
        ], ephemeral: true
      })
      const newtic = new MessageEmbed()
        .setColor("#ff9933")
        .setAuthor({ name: "Sanatana Rashtra Verification", iconURL: `${interaction.guild.iconURL()}` })
        .setFooter({ text: "Your ticket will be recorded in a transcript", iconURL: `${interaction.user.displayAvatarURL()}` })
        .setDescription('Hello there, \n Kindly answer the questions below and the staff will verify you!\nThank You!')
        .addField("To Create A Transcript:", "By pressing on the green button labbeld `Claiming` the channels transcript will be sent here.\n When this ticket is closed too, a copy of this tickets Transcript will be kept also.")

      let button1 = new MessageButton()
        .setCustomId("ticket-close")
        .setLabel("Close Ticket")
        .setEmoji("🔒")
        .setStyle("DANGER")

      let button2 = new MessageButton()
        .setCustomId("Transcript")
        .setLabel("Transcript")
        .setStyle("SUCCESS")


      let button4 = new MessageButton()
        .setCustomId("Lock")
        .setLabel("Lock Ticket")
        .setStyle("DANGER")

      let button5 = new MessageButton()
        .setCustomId("Unlock")
        .setLabel("Un-Lock Ticket")
        .setStyle("PRIMARY")


      const row = new MessageActionRow()
        .addComponents(button1, button2, button4, button5)


        const q = new MessageEmbed()
        .setDescription("✣ Where you got this server link from and who invited you? Server name or the username of the person who invited you? \n\n ✣ What makes you join this server? What do you think About Sanatan Dharma? \n\n ✣ Which sampradya you follow? \n\n ✣ Whats your purpose of joining this server? \n\n ✣ Will you accept the rules of this server?")
        .setColor("#2f3035")

      c.send({
        content: `<@${interaction.user.id}>`,
        embeds: [newtic, q],
        components: [row]
      }).then(msg => msg.pin())
    })

  }
  
}

 
    

      
    
});
