"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myUtil = require("../util/myUtil");
var sign = require("../util/signature");
var https_1 = require("https");
/* User Data */
var credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};
var url = 'https://api.twitter.com/1.1/followers/ids.json?screen_name=HypeleeAfrica';
var Twitter = /** @class */ (function () {
    function Twitter(obj) {
        this.obj = obj;
        this.auth = {
            oauth_nonce: myUtil.getRandom(6),
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: "" + Math.floor(Date.now() / 1000),
            oauth_consumer_key: obj.key,
            oauth_consumer_secret: obj.keySecret,
            oauth_token: obj.token,
            oauth_token_secret: obj.tokenSecret,
            get key() {
                return this.oauth_consumer_key;
            },
            set key(val) {
                this.oauth_consumer_key = val;
            },
            get keySecret() {
                return this.oauth_consumer_secret;
            },
            set keySecret(val) {
                this.oauth_consumer_secret = val;
            },
            get token() {
                return this.oauth_token;
            },
            set token(val) {
                this.oauth_token = val;
            },
            get tokenSecret() {
                return this.oauth_token_secret;
            },
            set tokenSecret(val) {
                this.oauth_token_secret = val;
            }
        };
    }
    Twitter.prototype.get = function (url, options) {
        var _this = this;
        var signature = sign.getSign(url, this.auth, 'GET');
        return new Promise(function (resolve, reject) {
            var req = https_1.request(url, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    resolve(chunk);
                });
            });
            req.on('error', function (err) {
                reject(err);
            });
            req.setHeader('Authorization', "OAuth\n            oauth_consumer_key=" + _this.auth.oauth_consumer_key + ",\n            oauth_token=" + _this.auth.oauth_token + ",oauth_signature_method=\"HMAC-SHA1\",\n            oauth_timestamp=" + _this.auth.oauth_timestamp + ",\n            oauth_nonce=" + _this.auth.oauth_nonce + ",\n            oauth_version=\"1.0\",\n            oauth_signature=" + signature);
            req.end();
        });
    };
    return Twitter;
}());
var t = new Twitter(credential);
t.get(url).then(function (data) {
    console.log(data);
}).catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map