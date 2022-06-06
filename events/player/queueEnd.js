const { MessageEmbed } = require("discord.js");

module.exports = async (client, player) => {
	const channel = client.channels.cache.get(player.textChannel);
	const embed = new MessageEmbed()
		.setColor(client.color)
		.setDescription(`\`📛\` | **Song has been:** \`Ended\``)

	player.destroy();
	channel.send({ embeds: [embed] });
}