// const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.music = require("discord.js-musicbot-addon");
client.music.start(client, {
	youtubeKey: process.env.YT_KEY
});
client.login(process.env.BOT_TOKEN);
// const queue = new Map();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'announcements');
	if(!channel) return; // If channel doesn't exist, do nothing
	channel.send(`Welcome to the server, ${member.user.tag}`);
});

client.on('message', message => {
	if(!message.guild) return;
	// General responses
	if (message.content === '~about') {
		return message.reply('I\'m fsobot, a free and minimal discord bot. Find out more about me here: https://github.com/s7kala/fsobot/');
	}
	if (message.content === '~hello') {
		return message.reply('Hello there!');
		}
	if (message.content === '~hi') {
		return message.reply('Hi there!');
		}
	if (message.content === '~thanks' || message.content === '~thx' || message.content === '~Thanks' || message.content === '~Thanks!') {
		return message.reply('You\'re welcome!');
	}
	if (message.content === '~okay' || message.content === '~Okay' || message.content === '~ok' || message.content === '~Ok' || message.content === 'kk') {
		return message.reply('Yeah...');
	}
	if (message.content === 'F' || message.content === 'f' || message.content === '~F' || message.content === '~f') {
		return message.reply('F');
	}
	// Kick	

	if(message.content.startsWith('~kick')) {
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
	// Join
	else if(message.content === '~join') {
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
	// Leave
	else if(message.content === '~leave') {
		if(message.member.voiceChannel) {
		message.member.voiceChannel.leave()
		message.reply(`Disconnected from ${message.member.voiceChannel}`);
		} else{
			message.reply('Join my channel first!');
		}
	}
	// Music
	if(message.content.startsWith('~play')) {
		const song = message.content.slice(5);
		message.client.music.bot.playFunction(message, song);
	} else if(message.content === '~np') {
		message.client.music.bot.npFunction(message, '');
	} else if(message.content === '~q') {
		message.client.music.bot.queueFunction(message, '');
	} else if(message.content === '~loop') {
		message.client.music.bot.loopFunction(message, '');
	} else if(message.content === '~pause') {
		message.client.music.bot.pauseFunction(message, '');
	} else if(message.content === '~resume') {
		message.client.music.bot.resumeFunction(message, '');
	} else if(message.content.startsWith('~search')) {
		const query = message.content.slice(7);
		message.client.music.bot.searchFunction(message, query);
	} else if(message.content === '~clearq') {
		message.client.music.bot.clearFunction();
	}
	
	});
	

// For modularization
/*
fs.readdir('./events/', (err, files) => {
	files.forEach(file => {
		const eventHandler = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, (...args) => eventHandler(client, ...args));
	})
});
*/

