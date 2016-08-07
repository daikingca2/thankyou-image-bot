var botkit = require('botkit');

// controller
var controller = botkit.slackbot({
    debug: false
});

// check api token
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

// start rtm
var bot = controller.spawn({
    token: process.env.token
}).startRTM();

// test
controller.hears('hi',['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,'hi');
});
