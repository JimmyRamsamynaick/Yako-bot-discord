module.exports = client => {

    client.on("guildMemberAdd", member => {
    
        const channelID = '1060218959565164586';

        console.log(member)

        const message = `**Bienvenue** sur le serveur, <@${member.id}>!`;

        const channel = member.guild.channels.cache.get(channelID);

        channel.send(message);

        const dmMessage = `Bienvenue sur le serveur ${member.guild.name}, ${member}, j'espère que tu te plaîras parmis nous`;

        member.send(dmMessage).catch(err => {
            return;
        })
    })
}