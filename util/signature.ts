import { createHmac } from "crypto";
import { URLSearchParams, URL } from "url";
import { stringify } from "querystring";


import myUtil = require('../util/myUtil');


export interface AUTHCREDENTIAL {
    oauth_nonce: string;
    oauth_version: "1.0";
    oauth_signature_method: "HMAC-SHA1";
    oauth_timestamp: number | string;
    oauth_consumer_key: string;
    oauth_consumer_secret: string;
    oauth_token: string;
    oauth_token_secret: string;
    [index: string]: any;
}

export function getSign(url: string | { host: string, path: string, params?: any }, auth: AUTHCREDENTIAL, method: string): string {
    let href = null;
    if (typeof url === 'string') {
        href = new URL(url);
    } else {
        let link = 'https://';
        link += url.host + url.path;
        if (url['params']) {
            link += '?' + stringify(url.params);
        }
        href = new URL(link);
    }

    const param = new URLSearchParams(href.searchParams);
    const signKey = auth.oauth_consumer_secret.concat('&', auth.oauth_token_secret);


    let myObj: { [index: string]: any } = {};
    myObj.oauth_consumer_key = auth.oauth_consumer_key;
    myObj.oauth_nonce = auth.oauth_nonce;
    myObj.oauth_signature_method = auth.oauth_signature_method;
    myObj.oauth_timestamp = auth.oauth_timestamp;
    myObj.oauth_token = auth.oauth_token;
    myObj.oauth_version = auth.oauth_version;

    for (const [name, value] of param) {
        myObj[encodeURIComponent(name)] = encodeURIComponent(value);
    }


    myObj = myUtil.sortObject(myObj);
    const baseUrl = href.origin + href.pathname;
    const encodedAuth = stringify(myObj);

    let finalStr = "";
    finalStr += encodeURIComponent(method);
    finalStr += '&';
    finalStr += encodeURIComponent(baseUrl);
    finalStr += "&";
    finalStr += encodeURIComponent(encodedAuth);

    const hmac = createHmac('SHA1', signKey);
    hmac.update(finalStr);
    const key = hmac.digest().toString('base64');
    return encodeURIComponent(key);
}

