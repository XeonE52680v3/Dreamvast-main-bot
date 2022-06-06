const delay = require('delay');
const { MessageEmbed } = require('discord.js');
const { reset } = require('../../config/filter');

module.exports = { 
    config: {
        name: "rate",
        description: "Sets the rate of the song.",
        category: "filters",
		accessableby: "Member",
		usage: '<pitch>',
        aliases: []
	},
	
	run: async (client, message, args) => {
        const player = client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("You need to be in a same/voice channel.")

		if (isNaN(args[0])) return message.channel.send('Amount must be a real number.');
		if (args[0] < 0) return message.channel.send('Rate must be greater than 0.');
		if (args[0] > 10) return message.channel.send('Rate must be less than 10.');

		await player.setFilter('filters', {
			timescale: { rate: args[0] },
		});
		const msg = await message.channel.send(`Setting **Rate** to **${args[0]}x**. This may take a few seconds...`);
		const embed = new MessageEmbed()
			.setAuthor({ name: `Rate set to: ${args[0]}x`, iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
			.setColor(client.color);
		await delay(5000);
		msg.edit({ content: " ", embeds: [embed] });
	}
};