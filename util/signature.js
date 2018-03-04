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
var crypto_1 = require("crypto");
var url_1 = require("url");
var querystring_1 = require("querystring");
var myUtil = require("../util/myUtil");
function getSign(url, auth, method) {
    var href = null;
    if (typeof url === 'string') {
        href = new url_1.URL(url);
    }
    else {
        var link = 'https://';
        link += url.host + url.path;
        if (url['params']) {
            link += '?' + querystring_1.stringify(url.params);
        }
        href = new url_1.URL(link);
    }
    var param = new url_1.URLSearchParams(href.searchParams);
    var signKey = auth.oauth_consumer_secret.concat('&', auth.oauth_token_secret);
    var myObj = {};
    myObj.oauth_consumer_key = auth.oauth_consumer_key;
    myObj.oauth_nonce = auth.oauth_nonce;
    myObj.oauth_signature_method = auth.oauth_signature_method;
    myObj.oauth_timestamp = auth.oauth_timestamp;
    myObj.oauth_token = auth.oauth_token;
    myObj.oauth_version = auth.oauth_version;
    try {
        for (var param_1 = __values(param), param_1_1 = param_1.next(); !param_1_1.done; param_1_1 = param_1.next()) {
            var _a = __read(param_1_1.value, 2), name = _a[0], value = _a[1];
            myObj[encodeURIComponent(name)] = encodeURIComponent(value);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (param_1_1 && !param_1_1.done && (_b = param_1.return)) _b.call(param_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    myObj = myUtil.sortObject(myObj);
    var baseUrl = href.origin + href.pathname;
    var encodedAuth = querystring_1.stringify(myObj);
    var finalStr = "";
    finalStr += encodeURIComponent(method);
    finalStr += '&';
    finalStr += encodeURIComponent(baseUrl);
    finalStr += "&";
    finalStr += encodeURIComponent(encodedAuth);
    var hmac = crypto_1.createHmac('SHA1', signKey);
    hmac.update(finalStr);
    var key = hmac.digest().toString('base64');
    return encodeURIComponent(key);
    var e_1, _b;
}
exports.getSign = getSign;
//# sourceMappingURL=signature.js.map