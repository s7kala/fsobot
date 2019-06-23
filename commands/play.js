module.exports = (message, serverQueue) => {
	const args = message.content.split(' ');
  const voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.channel.send('Enter a voice channel to play music!');
  
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
  return message.channel.send('I need the permissions to join and speak in this channel');
  
}
