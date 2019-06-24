const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const queue = new Map();

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
	const serverQueue = queue.get(message.guild.id);
	const ytdl = require('ytdl-core');
	if (message.content.startsWith('~play')) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith('~skip')) {
	skip(message, serverQueue);
	return;
	} else if (message.content.startsWith('~stop')) {
	stop(message, serverQueue);
	return;
	}
	async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
		}
	}

	function skip(message, serverQueue) {
		if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
		if (!serverQueue) return message.channel.send('There is no song that I could skip!');
		message.channel.send('Skipping...');
		serverQueue.connection.dispatcher.end();
	}

	function stop(message, serverQueue) {
		if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
		if (!serverQueue) return message.channel.send('There is nothing to stop .-.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	}

	function play(guild, song) {
		const serverQueue = queue.get(guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
	}
		message.channel.send(`Playing ${song.title} as requested by ${message.author}`);
		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', () => {
				console.log('Music ended!');
				serverQueue.songs.shift();
				play(guild, serverQueue.songs[0]);
			})
			.on('error', error => {
				console.error(error);
			});
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	}
  })


client.login(process.env.BOT_TOKEN);
