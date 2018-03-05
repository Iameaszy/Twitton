"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = require("https");
var signature_1 = require("../util/signature");
var url_1 = require("url");
var querystring_1 = require("querystring");
var Fetch = /** @class */ (function () {
    function Fetch() {
    }
    Fetch.prototype.fetch = function (url, method) {
        var _this = this;
        var req;
        var signature;
        var parsedUrl;
        if (typeof url === 'string') {
            signature = signature_1.getSign(url, this.auth, method);
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
            signature = signature_1.getSign("https://" + url.host + url.path + search, this.auth, method);
        }
        return new Promise(function (resolve, reject) {
            req.on('response', function (res) {
                res.setEncoding('utf8');
                var data;
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve({ 'data': data });
                });
            });
            req.on('error', function (err) {
                reject({ err: err });
            });
            req.setHeader('Authorization', 'OAuth oauth_consumer_key="' + _this.auth.key + '",oauth_token="' + _this.auth.token + '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + _this.auth.oauth_timestamp + '",oauth_nonce="' + _this.auth.oauth_nonce + '",oauth_version="1.0",oauth_signature="' + signature + '"');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.end();
        });
    };
    return Fetch;
}());
exports.Fetch = Fetch;
//# sourceMappingURL=fetch.js.map