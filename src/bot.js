const Discord = require('discord.js');
const config = require('./config.json');
const swearWords = config.swearWords;

const client = new Discord.Client({
	intents: [
		"Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildVoiceStates",
	],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (swearWords.some(swearWord => message.content.includes(swearWord))) {
    message.delete()
      .then(() => console.log(`Deleted message from ${message.author.tag}: ${message.content}`))
      .catch((error) => console.error('Error deleting message:', error));
  }
});

client.login(config.token);