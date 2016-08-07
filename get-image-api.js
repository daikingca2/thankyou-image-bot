// モジュール読み込み
var rp = require('request-promise');
var conf = require('config');


module.exports.getImageUrl = function(name) {

    // オプション定義
    var options = { method: 'GET',
      url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search',
      qs: { q: name, count: '1', offset: rand(10), mkt: 'ja-JP' },
      headers:
       { 'cache-control': 'no-cache',
         'ocp-apim-subscription-key': conf.apikey }
     };

    // request-promise
     rp(options).then(function (res) {
         var jsonres = JSON.parse(res);
         // ↓だめ
        return res;
    }).catch(function (err) {
        return err;
    });
}


var rand = function(n) {
    return randomIntNumber = Math.floor(Math.random()*(n+1));
}
