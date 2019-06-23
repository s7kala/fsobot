module.exports = message => {
	if(message.member.voiceChannel) {
		message.member.voiceChannel.leave()
		message.reply(`Disconnected from ${message.member.voiceChannel}`);
	} else{
		message.reply('Join my channel first!');
	}
}
