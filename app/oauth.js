"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myUtil_1 = require("../util/myUtil");
var Auth = /** @class */ (function () {
    function Auth(obj) {
        this.auth = {
            oauth_nonce: myUtil_1.getRandom(6),
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: "" + Math.floor(Date.now() / 1000),
            oauth_consumer_key: obj.key,
            oauth_consumer_secret: obj.keySecret,
            oauth_token: obj.token,
            oauth_token_secret: obj.tokenSecret
        };
    }
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=oauth.js.map