"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var myUtil = require("../util/myUtil");
var url_1 = require("url");
var querystring_1 = require("querystring");
var crypto_1 = require("crypto");
var auth = {
    'oauth_consumer_key': 'Frr2qLWTtMctBLin1t3NmtQa3',
    'oauth_token': '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    'oauth_timestamp': Math.floor(Date.now() / 1000),
    'oauth_nonce': myUtil.getRandom(6),
    'oauth_signature_method': 'HMAC-SHA1'
};
var oauth_secret = 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P';
var conSecret = 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C';
var signingKey = conSecret.concat('&', oauth_secret);
var href = 'https://api.twitter.com/1.1/followers/ids.json?screen_name=HypeleeAfrica';
var url = new url_1.URL(href);
var param = new url_1.URLSearchParams(url.searchParams);
try {
    for (var param_1 = __values(param), param_1_1 = param_1.next(); !param_1_1.done; param_1_1 = param_1.next()) {
        var _a = __read(param_1_1.value, 2), name = _a[0], value = _a[1];
        auth[encodeURIComponent(name)] = encodeURIComponent(value);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (param_1_1 && !param_1_1.done && (_b = param_1.return)) _b.call(param_1);
    }
    finally { if (e_1) throw e_1.error; }
}
auth = myUtil.sortObject(auth);
var method = 'GET';
var baseUrl = url.origin + url.pathname;
var joinedParams = querystring_1.stringify(auth);
var finalStr = "";
finalStr += encodeURIComponent(method);
finalStr += '&';
finalStr += encodeURIComponent(baseUrl);
finalStr += "&";
finalStr += encodeURIComponent(joinedParams.toString());
var hmac = crypto_1.createHmac('SHA1', signingKey);
hmac.update(finalStr);
console.log(hmac.digest().toString('base64'));
var e_1, _b;
//# sourceMappingURL=test.js.map