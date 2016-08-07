var botkit = require('botkit');
var rp = require('request-promise');
var conf = require('config');
var words = require('./thunkyouWordList.json');

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

// すべてのメッセージに対して → 1個目の引数を空にすればok
controller.hears('',['direct_message','direct_mention','mention'],function(bot,message) {
    // メッセージの内容
    // message.text
    var replyFlag = false;
    var msg = message.text;
    var msgSpritArray = msg.split(' '); // スペースで分割
    var list = words.list;
    if (list !== null) {
        if (msgSpritArray.length == 2) {
            for (var i = 0; i < list.length; i++) {
                if (msgSpritArray[0] == list[i]) {
                    replyFlag = true;
                    break;
                } else {
                    replyFlag = false;
                }
            }
        } else {
            replyFlag = false;
        }
    } else {
        replyFlag = false;
    }

    if (replyFlag !== false) {
        // オプション定義
        var options = { method: 'GET',
          url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
          qs: { q: msg, count: '5', offset: rand(10), mkt: 'ja-JP' },
          headers:
           { 'cache-control': 'no-cache',
             'ocp-apim-subscription-key': conf.apikey }
         };

        // request-promise
         rp(options).then(function (res) {
            var jsonres = JSON.parse(res);
             console.log(jsonres);
            bot.reply(message,jsonres.value[0].thumbnailUrl);
        }).catch(function (err) {
            return;
        });

    }else {
        return;
    }
});


var rand = function(n) {
    return randomIntNumber = Math.floor(Math.random()*(n+1));
}
