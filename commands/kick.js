module.exports = message => {
	const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.member(user);
			if(member) {
				member.kick('Kicked through bot').then(() => {
					return message.reply(`${member.user.tag} was kicked.`);
				}).catch(err => {
					message.reply('Unable to kick the member');
					console.error(err);
				});
			} else {
				message.reply('That user isn\'t in this guild!');
			}
		} else {
			message.reply('You didn\'t mention the user to kick!');
		}
}