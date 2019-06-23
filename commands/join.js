module.exports = message => {
	if(message.member.voiceChannel) {
		message.member.voiceChannel.join()
			.then(connection => {
				message.reply(`Connected to ${message.member.voiceChannel}`);
			})
			.catch(console.log);
	} else{
		message.reply('Join a channel first!');
	}
}
