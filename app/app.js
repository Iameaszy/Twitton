"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
var myUtil = require("../util/myUtil");
var url_1 = require("url");
var https_1 = require("https");
var sign = require("../util/signature");
var http_1 = require("http");
// Cache
var cache = {};
/* User Data */
var credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};
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
    Twitter.prototype.request = function (url, method) {
        var _this = this;
        var req;
        var signature;
        var parsedUrl;
        if (typeof url === 'string') {
            signature = sign.getSign(url, this.auth, method);
            parsedUrl = url_1.parse(url);
            req = https_1.request({
                method: method,
                host: parsedUrl.host,
                path: parsedUrl.path
            });
        }
        else {
            var search = "";
            if (url['params']) {
                search += '?' + querystring_1.stringify(url.params);
            }
            console.log(url);
            req = https_1.request({
                method: method,
                host: url.host,
                path: url.path + search
            });
            signature = sign.getSign("https://" + url.host + url.path + search, this.auth, method);
        }
        return new Promise(function (resolve, reject) {
            req.on('response', function (res) {
                res.setEncoding('utf8');
                var data;
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(data);
                });
            });
            req.on('error', function (err) {
                reject(err);
            });
            req.setHeader('Authorization', 'OAuth oauth_consumer_key="' + credential.key + '",oauth_token="' + credential.token + '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + _this.auth.oauth_timestamp + '",oauth_nonce="' + _this.auth.oauth_nonce + '",oauth_version="1.0",oauth_signature="' + signature + '"');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.end();
        });
    };
    Twitter.prototype.oauth = function () {
    };
    Twitter.prototype.get = function (url) {
        return this.request(url, 'GET');
    };
    return Twitter;
}());
var t = new Twitter(credential);
t.getFollowers({ count: 1000 }).then(function (data) {
    if (data) {
        http_1.createServer(function (req, res) {
            res.end(data);
        }).listen({ host: '127.0.0.1', port: 8080 }, function () {
            console.log(this.address());
        });
    }
}).catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.js.map