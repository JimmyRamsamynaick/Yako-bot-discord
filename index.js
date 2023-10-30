const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences,] });

const prefix = '!';

const welcome = require('./welcome.js');

client.on("ready", () => {
    console.log("Je suis opérationnel!");

    welcome(client)

    client.user.setActivity(`Abonnez vous à BlackAngel9708 sur twitch`, { type: "PLAYING"})
})

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //messay array var

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

                            //COMMANDS
    //test command

if (command === 'test'){
    message.channel.send('Le bot fonctionne correctement!')
}

    //ban command
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


// Timeout commands

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




// untime out command
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


    //unban command
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




    //membercount
if (cmd === `${prefix}nombre`){
    message.channel.send(`**Dans le serveur, nous somme à: ${message.guild.memberCount} membres actuellement**`)
};


})


client.login("MTA1OTkxMzMzMzMwMzY4MTEwNg.GyivAP.FhT3SH7Vq2BwJxidO46PCXxhS_c1aFr6h650UU");