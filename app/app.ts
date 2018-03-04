import { stringify } from 'querystring';
import myUtil = require('../util/myUtil');
import { URL, parse } from 'url';
import { get, request } from 'https';

import sign = require('../util/signature');
import { createServer, ClientRequest } from 'http';
import { basename } from 'path';


// Cache
const cache = {};
/* User Data */
const credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};

type METHOD = 'POST' | 'PUT' | 'GET' | 'DELETE';

class Twitter {
    public auth: sign.AUTHCREDENTIAL;
    private that: any;
    constructor(
        private obj: {
            key: string,
            keySecret: string,
            token: string,
            tokenSecret: string
        }
    ) {
        this.auth = {
            oauth_nonce: myUtil.getRandom(6),
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: `${Math.floor(Date.now() / 1000)}`,
            oauth_consumer_key: obj.key,
            oauth_consumer_secret: obj.keySecret,
            oauth_token: obj.token,
            oauth_token_secret: obj.tokenSecret,
            get key() {
                return this.oauth_consumer_key;
            },
            set key(val: string) {
                this.oauth_consumer_key = val;
            },
            get keySecret() {
                return this.oauth_consumer_secret;
            },
            set keySecret(val: string) {
                this.oauth_consumer_secret = val;
            },
            get token() {
                return this.oauth_token;
            },
            set token(val: string) {
                this.oauth_token = val;
            },
            get tokenSecret() {
                return this.oauth_token_secret;
            },
            set tokenSecret(val: string) {
                this.oauth_token_secret = val;
            }
        };
    }
    

    request(url: string | { host: string, path: string, params?: { [index: string]: any } }, method: METHOD) {
        let req: ClientRequest;
        let signature: any;
        let parsedUrl: any;
        if (typeof url === 'string') {
            signature = sign.getSign(url, this.auth, method);
            parsedUrl = parse(url);
            req = request({
                method: method,
                host: parsedUrl.host,
                path: parsedUrl.path
            });
        } else {
            let search = "";
            if (url['params']) {
                search += '?' + stringify(url.params);
            }
            console.log(url);
            req = request({
                method: method,
                host: url.host,
                path: url.path + search
            });
            signature = sign.getSign(`https://${url.host}${url.path}${search}`, this.auth, method);
        }
        return new Promise((resolve, reject) => {
            req.on('response', (res) => {
                res.setEncoding('utf8');
                let data: any;
                res.on('data', (chunk: string) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });
            req.on('error', (err) => {
                reject(err);
            });

            req.setHeader('Authorization', 'OAuth oauth_consumer_key="' + credential.key + '",oauth_token="' + credential.token + '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + this.auth.oauth_timestamp + '",oauth_nonce="' + this.auth.oauth_nonce + '",oauth_version="1.0",oauth_signature="' + signature + '"');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.end();
        });
    }
    oauth() {

    }
    get(url: string) {
        return this.request(url, 'GET');
    }

}

const t = new Twitter(credential);
t.getFollowers({ count: 1000 }).then(function (data) {
    if (data) {
        createServer((req, res) => {
            res.end(data);
        }).listen({ host: '127.0.0.1', port: 8080 }, function () {
            console.log(this.address());
        });
    }
}).catch((err) => console.log(err));

