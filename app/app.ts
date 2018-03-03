import myUtil = require('../util/myUtil');
import { URL } from 'url';
import sign = require('../util/signature');
import { get, request } from 'https';


/* User Data */
const credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};

const url = 'https://api.twitter.com/1.1/followers/ids.json?screen_name=HypeleeAfrica';


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

    get(url: string, options?: { [index: string]: any }) {
        const signature = sign.getSign(url, this.auth, 'GET');
        return new Promise((resolve, reject) => {
            const req = request(url, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    resolve(chunk);
                });
            });

            req.on('error', (err) => {
                reject(err);
            });

            req.setHeader('Authorization', `OAuth
            oauth_consumer_key=${this.auth.oauth_consumer_key},
            oauth_token=${this.auth.oauth_token},oauth_signature_method="HMAC-SHA1",
            oauth_timestamp=${this.auth.oauth_timestamp},
            oauth_nonce=${this.auth.oauth_nonce},
            oauth_version="1.0",
            oauth_signature=${signature}`);
            req.end();
        });
    }
}



const t = new Twitter(credential);
t.get(url).then(function (data) {
    console.log(data);
}).catch((err) => console.log(err));

