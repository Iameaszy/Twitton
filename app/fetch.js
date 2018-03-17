"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = require("https");
var signature_1 = require("../util/signature");
var oauth_1 = require("./oauth");
var url_1 = require("url");
var querystring_1 = require("querystring");
var Fetch = /** @class */ (function (_super) {
    __extends(Fetch, _super);
    function Fetch() {
        return _super !== null && _super.apply(this, arguments) || this;
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
                var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', function (err) {
                reject({ err: err });
            });
            req.setHeader('Authorization', 'OAuth oauth_consumer_key="' + _this.auth.oauth_consumer_key + '",oauth_token="' + _this.auth.oauth_token + '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + _this.auth.oauth_timestamp + '",oauth_nonce="' + _this.auth.oauth_nonce + '",oauth_version="1.0",oauth_signature="' + signature + '"');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.end();
        });
    };
    return Fetch;
}(oauth_1.Auth));
exports.Fetch = Fetch;
//# sourceMappingURL=fetch.js.map