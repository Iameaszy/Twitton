import https = require('https');
import * as client from "request";
import myUtil = require('../util/myUtil');
import { URL, URLSearchParams, parse } from 'url';
import { stringify } from 'querystring';
import { createHmac } from 'crypto';


let auth: { [index: string]: any } = {
    'oauth_consumer_key': 'Frr2qLWTtMctBLin1t3NmtQa3',
    'oauth_token': '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    'oauth_timestamp': Math.floor(Date.now() / 1000),
    'oauth_nonce': myUtil.getRandom(6),
    'oauth_signature_method': 'HMAC-SHA1'
};
const oauth_secret = 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P';
const conSecret = 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C';
const signingKey = conSecret.concat('&', oauth_secret);
const href = 'https://api.twitter.com/1.1/followers/ids.json?screen_name=HypeleeAfrica';
const url = new URL(href);

const param = new URLSearchParams(url.searchParams);

for (const [name, value] of param) {
    auth[encodeURIComponent(name)] = encodeURIComponent(value);
}

auth = myUtil.sortObject(auth);
const method = 'GET';
const baseUrl = url.origin + url.pathname;
const joinedParams = stringify(auth);
let finalStr = "";
finalStr += encodeURIComponent(method);
finalStr += '&';
finalStr += encodeURIComponent(baseUrl);
finalStr += "&";
finalStr += encodeURIComponent(joinedParams.toString());

const hmac = createHmac('SHA1', signingKey);


hmac.update(finalStr);

console.log(hmac.digest().toString('base64'));



