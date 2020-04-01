require('dotenv').config()
const tmi = require('tmi.js');
const Max = require('max-api');

// Define configuration options
const opts = {
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_PASSWORD
  },
  channels: [
    process.env.TWITCH_CHANNEL
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === 'foo') {
    client.say(target, `You did a ${commandName} command`);
    console.log(`* Executed ${commandName} command`);
	Max.outlet(`foo`);
  }else if (commandName === 'bar') {
    client.say(target, `You did a ${commandName} command`);
    console.log(`* Executed ${commandName} command`);
	Max.outlet(`bar`);
  } else {
	client.say(target, `${commandName} is an unknown command!`);
    console.log(`* Unknown command ${commandName}`);
	Max.outlet(`* Unknown command ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}