module.exports = (client, member) => {
	 // Find channel to greet in
  const channel = member.guild.channels.find(ch => ch.name === 'announcements');
  if(!channel) return; // If channel doesn't exist, do nothing
  channel.send(`Welcome to the server, ${member.user.tag}`);
}