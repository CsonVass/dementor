const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

const YTDL = require("ytdl-core");

function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() {
    if(server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}


var servers = {};

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`);

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

if (cmd === `${prefix}gyeremanideno`){
  if(!message.member.roles.find("name", "dementor")) return message.reply("No, no... Mr. Dementor nem engedelmeskedni önnek!");

  let channel = bot.channels.get('478619239327072277');

  channel.join()

  let commandschannel = message.guild.channels.find(`name`, `azkabbann⛓`);

  commandschannel.send("*belebeg, minden elsötétül, hideg lesz, mintha minden boldogság eltűnt volna a világból.*");
}

if (cmd === `${prefix}huzzadra`){
  if(!message.member.roles.find("name", "dementor")) return message.reply("No, no... Mr. Dementor nem engedelmeskedni önnek!");
  if(!args[0]) {
    message.channel.send("Hiányzó link");
    return;

  }

  if(!message.member.voiceChannel) {
    message.channel.sendMessage("Egy voice channelben kell lenned, hogy használd!");
    return;
  }

  if(!servers[message.guild.id]) servers[message.guild.id] = {
    queue: []
  };

  var server = servers[message.guild.id];

  server.queue.push(args[0]);

  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
    play(connection, message);
  });


}

if (cmd === `${prefix}kovi`){
  var server = servers[message.guild.id];
    if(!message.member.roles.find("name", "dementor")) return message.reply("No, no... Mr. Dementor nem engedelmeskedni önnek!");

  if(server.dispatcher) server.dispatcher.end();
}

if (cmd === `${prefix}sthaap`){
  var server = servers[message.guild.id];
    if(!message.member.roles.find("name", "dementor")) return message.reply("No, no... Mr. Dementor nem engedelmeskedni önnek!");

  if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
}




});
  bot.login('NDgwNzY3OTIwNTAzMjU5MTU4.Dlsmew.4S1PYipxUktSIh4mlCmUyUBlbg');
