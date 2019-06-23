module.exports = (client, message) => {
	if(!message.guild) return;
	// General responses
	if (message.content === '~hello') {
		return message.reply('Hello there!');
		}
	if (message.content === '~hi') {
		return message.reply('Hi there!');
		}
	if(message.content === '~thanks' || message.content === '~thx' || message.content === '~Thanks' || message.content === '~Thanks!') {
		return message.reply('You\'re welcome!');
	}
	if(message.content === '~okay' || message.content === '~Okay' || message.content === '~ok' || message.content === '~Ok' || message.content === 'kk') {
		return message.reply('Yeah...');
	}
	if(message.content === 'F' || message.content === 'f' || message.content === '~F' || message.content === '~f') {
		return message.reply('F');
	}
	// Kick	
	const kick = require('../commands/kick');
	if(message.content.startsWith('~kick')) {
		return kick(message);
	}
	// Join
	const join = require('../commands/join');
	if(message.content === '~join') {
		return join(message);
	}
	// Leave
	const leave = require('../commands/leave');
	if(message.content === '~leave') {
		return leave(message);
	}
	// Music
	const music = require('../features/music');
	if(message.content.startsWith('~play') || message.content.startsWith('~stop') || message.content.startsWith('~skip')) {
		return music(message);
	}
}
