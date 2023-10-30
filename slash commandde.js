const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.MessageContent] });

const prefix = '!';

const welcome = require('./welcome.js');

client.on("ready", () => {
    console.log("Je suis opérationnel!");

    welcome(client);

    client.user.setActivity(`Abonnez vous à BlackAngel9708 sur twitch`, { type: "PLAYING" });
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Reste du code de vos commandes avec préfixe
    if (command === 'test') {
        message.channel.send('Le bot fonctionne correctement!');
    }

    if (command === 'ban') {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ").toLowerCase());

        if (command === 'ban') {
          const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x =>x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
      
          if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send("Tu n'as pas les permissions requises pour bannir des membres dans ce serveur!");
          if (!member) return message.channel.send("Tu dois spécifier qui est ce que tu veux bannir avec cette commande!")
          if (message.member === member) return message.channel.send("Tu ne peux pas te bannir toi même!");
          if (!member.kickable) return message.channel.send("Tu ne peux pas bannir cette personne!");
      
          let reason = argument.slice(1).join(" ") || "Il n'y a aucune raison donné pour bannir cette personne!"
      
          const embed = new EmbedBuilder()
          .setColor("Blue")
          .setDescription(`:white_check_mark: ${member.user.tag} à bien était **banni** du serveur | ${reason}`)
      
          const dmEmbed = new EmbedBuilder()
          .setColor("Blue")
          .setDescription(`:white_check_mark: Tu as était **banni** de ${message.guild.name} | ${reason}`)
      
          member.send({ embeds: [dmEmbed]}).catch(err => {
              console.log(`${member.user.tag} as ces messages privé en off et ne peux donc pas reçevoir son message de bannissement!`);
          })
      
          member.ban().catch(err => {
              message.channel.send("Il y a une erreur au moment du bannissement de ce membre!");
          })
      
          message.channel.send({ embeds: [embed] });
      }

        message.channel.send(`Le membre ${member} a été banni avec succès.`);
    }

    if (command === 'timeout') {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ").toLowerCase());
        const duration = parseInt(args[1]);
        const reason = args.slice(2).join(" ");

        if (command === 'timeout') {
          const timeUser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
          const duration = parseInt(argument[1]);
      
          if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("Tu n'as pas les permissions pour Timeout des membres sur ce serveur!");
          if (!timeUser) return message.channel.send("Veuillez spécifier qui voulez-vous Timeout sur ce serveur");
          if (message.member === timeUser) return message.channel.send("Tu ne peux pas te Timeout toi-même");
          if (!duration || isNaN(duration)) return message.channel.send("Veuillez spécifier une durée valide pour le Timeout en secondes");
          if (duration > 259200) return message.channel.send("Veuillez choisir une durée entre 1 seconde et 259200 secondes (3 jours)");
      
          let reason = argument.slice(2).join(" ") || 'Aucune raison donnée';
      
          const embed = new EmbedBuilder()
              .setColor("Blue")
              .setDescription(`:white_check_mark: ${timeUser.user.tag} a bien été **mute** pendant ${duration} seconde(s) | ${reason}`);
      
          const dmEmbed = new EmbedBuilder()
              .setColor("Blue")
              .setDescription(`:white_check_mark: Tu as été **mute** dans ${message.guild.name} pendant ${duration} seconde(s) | ${reason}`);
      
          const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted");
          if (!mutedRole) {
              return message.channel.send("Le rôle 'Muted' n'existe pas sur ce serveur. Veuillez le créer et réessayer.");
          }
      
          timeUser.roles.add(mutedRole);
      
          message.channel.send({ embeds: [embed] });
      
          timeUser.send({ embeds: [dmEmbed] }).catch(err => {
              return;
          });
      
          const textChannels = message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');
          textChannels.forEach(channel => {
              channel.permissionOverwrites.edit(timeUser, { SEND_MESSAGES: false });
          });
      
          setTimeout(() => {
              timeUser.roles.remove(mutedRole);
              textChannels.forEach(channel => {
                  channel.permissionOverwrites.edit(timeUser, { SEND_MESSAGES: null });
              });
          }, duration * 1000);
      }

        message.channel.send(`Le membre ${member} a été muté pendant ${duration} secondes.`);
    }





    if (command === 'untimeout') {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.join(" ").toLowerCase());
        const reason = args.slice(1).join(" ");
        if (command === 'untimeout') {
          const timeUser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));
      
          if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return message.channel.send("Tu n'as pas les permissions pour untime out les membres sur ce serveur!");
          if (!timeUser) return message.channel.send("Veuillez spécifier le membre à qui vous voulez enlever le timeout");
          if (message.member === timeUser) return message.channel.send("Tu ne peux pas te retirer toi-même le timeout");
          if (!timeUser.kickable) return message.channel.send("Tu ne peux pas retirer le timeout de cette personne");
      
          let reason = argument.slice(1).join(" ") || 'Aucune raison n\'a été donnée';
      
          const embed = new EmbedBuilder()
              .setColor("Blue")
              .setDescription(`:white_check_mark: ${timeUser.user.tag} a bien été **untimeout** | ${reason}`);
      
          const dmEmbed = new EmbedBuilder()
              .setColor("Blue")
              .setDescription(`:white_check_mark: Tu as bien été **untimeout** dans ${message.guild.name} | ${reason}`);
      
          const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted");
          if (!mutedRole) {
              return message.channel.send("Le rôle 'Muted' n'existe pas sur ce serveur. Veuillez le créer et réessayer.");
          }
      
          timeUser.roles.remove(mutedRole);
      
          message.channel.send({ embeds: [embed] });
      
          timeUser.send({ embeds: [dmEmbed] }).catch(err => {
              return;
          });
      }

        message.channel.send(`Le timeout a été levé pour le membre ${member}.`);
    }




    if (command === 'unban') {
        const member = args[0];
        const reason = args.slice(1).join(" ");

        if (command === 'unban') {

          const member = argument[0];
      
          let reason = argument.slice(1).join(" ") || `Aucune raison n'a était donné`
      
          const embed = new EmbedBuilder()
          .setColor("Blue")
          .setDescription(`:white_check_mark: <@${member}> a bien était **débanni** | ${reason}`) 
      
          message.guild.bans.fetch()
              .then(async bans => {
                  if (bans.size === 0) return message.channel.send(`il n'y a personne a débannir sur ce serveur`);
      
                  let bannedId = bans.find(ban => ban.user.id == member);
                  if (!bannedId) return await message.channel.send(`la personne indiqué n'est pas banni de ce serveur`);
      
                  await message.guild.bans.remove(member, reason).catch(err => {
                      return message.channel.send("Il y a eu une erreur pour unban ce membre");
                  })
      
                  await message.channel.send({ embeds: [embed] });
              })
      }
      

        message.channel.send(`Le membre ${member} a été débanni.`);
    }
});




client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    // Commandes Slash
    if (commandName === 'test') {
        await interaction.reply('Le bot fonctionne correctement!');
    }

    if (commandName === 'ban') {
        const member = options.getMember('membre');

        if (commandName === 'ban') {
          const user = options.getUser('utilisateur');
          const reason = options.getString('raison');
      
          if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
              return await interaction.reply("Tu n'as pas les permissions requises pour bannir des membres sur ce serveur !");
          }
      
          if (!user) {
              return await interaction.reply("Veuillez spécifier l'utilisateur que vous souhaitez bannir.");
          }
      
          if (user.id === interaction.user.id) {
              return await interaction.reply("Tu ne peux pas te bannir toi-même !");
          }
      
          const member = interaction.guild.members.cache.get(user.id);
      
          if (!member.bannable) {
              return await interaction.reply("Tu ne peux pas bannir cet utilisateur !");
          }
      
          try {
              await member.ban({ reason: reason });
          } catch (error) {
              return await interaction.reply("Une erreur s'est produite lors du bannissement de cet utilisateur.");
          }
      
          await interaction.reply(`L'utilisateur ${user.tag} a été banni du serveur. Raison : ${reason}`);
      }
      

        await interaction.reply(`Le membre ${member} a été banni avec succès.`);
    }




    if (commandName === 'timeout') {
        const member = options.getMember('membre');
        const duration = options.getNumber('durée');
        const reason = options.getString('raison');

        if (commandName === 'timeout') {
          const user = options.getUser('utilisateur');
          const duration = options.getInteger('durée');
          const reason = options.getString('raison');
      
          if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
              return await interaction.reply("Tu n'as pas les permissions pour appliquer un timeout aux membres sur ce serveur !");
          }
      
          if (!user) {
              return await interaction.reply("Veuillez spécifier l'utilisateur que vous souhaitez mettre en timeout.");
          }
      
          if (!duration || isNaN(duration) || duration < 1 || duration > 259200) {
              return await interaction.reply("Veuillez spécifier une durée valide pour le timeout (entre 1 seconde et 259200 secondes).");
          }
      
          const mutedRole = interaction.guild.roles.cache.find(role => role.name === "Muted");
          if (!mutedRole) {
              return await interaction.reply("Le rôle 'Muted' n'existe pas sur ce serveur. Veuillez le créer et réessayer.");
          }
      
          try {
              await user.roles.add(mutedRole);
              setTimeout(() => {
                  user.roles.remove(mutedRole);
              }, duration * 1000);
          } catch (error) {
              return await interaction.reply("Une erreur s'est produite lors de l'application du timeout à cet utilisateur.");
          }
      
          await interaction.reply(`L'utilisateur ${user.tag} a été mis en timeout pendant ${duration} seconde(s). Raison : ${reason}`);
      }
      

        await interaction.reply(`Le membre ${member} a été muté pendant ${duration} secondes.`);
    }



    if (commandName === 'untimeout') {
        const member = options.getMember('membre');
        const reason = options.getString('raison');

        if (commandName === 'untimeout') {
          const member = options.getMember('membre');
          const reason = options.getString('raison');
      
          if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
              return await interaction.reply("Tu n'as pas les permissions pour enlever le timeout aux membres sur ce serveur !");
          }
      
          if (!member) {
              return await interaction.reply("Veuillez spécifier le membre à qui vous voulez enlever le timeout.");
          }
      
          if (interaction.member === member) {
              return await interaction.reply("Tu ne peux pas te retirer toi-même le timeout.");
          }
      
          const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
          if (!mutedRole) {
              return await interaction.reply("Le rôle 'Muted' n'existe pas sur ce serveur. Veuillez le créer et réessayer.");
          }
      
          if (!member.roles.cache.has(mutedRole.id)) {
              return await interaction.reply("Ce membre n'est pas en timeout.");
          }
      
          try {
              await member.roles.remove(mutedRole);
          } catch (error) {
              return await interaction.reply("Une erreur s'est produite lors de la suppression du timeout pour ce membre.");
          }
      
          await interaction.reply(`Le timeout a été levé pour le membre ${member}.`);
      }
      

        await interaction.reply(`Le timeout a été levé pour le membre ${member}.`);
    }




    if (commandName === 'unban') {
        const member = options.getString('membre');
        const reason = options.getString('raison');

        if (commandName === 'unban') {
          const user = options.getUser('utilisateur');
          const reason = options.getString('raison');
      
          if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
              return await interaction.reply("Tu n'as pas les permissions pour débannir des membres sur ce serveur !");
          }
      
          if (!user) {
              return await interaction.reply("Veuillez spécifier l'utilisateur que vous souhaitez débannir.");
          }
      
          try {
              await interaction.guild.bans.remove(user, reason);
          } catch (error) {
              return await interaction.reply("Une erreur s'est produite lors du débannissement de cet utilisateur.");
          }
      
          await interaction.reply(`L'utilisateur ${user.tag} a été débanni.`);
      }
      

        await interaction.reply(`Le membre ${member} a été débanni.`);
    }
});

client.login("MTA1OTkxMzMzMzMwMzY4MTEwNg.GyivAP.FhT3SH7Vq2BwJxidO46PCXxhS_c1aFr6h650UU");
