import { basename } from 'path';
import { AUTHCREDENTIAL } from '../util/signature';
import { Fetch } from './fetch';
import { getRandom } from '../util/myUtil';
import { Followers } from './followers';

/* User Data */
const credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};


interface obj {
    key: string,
    keySecret: string,
    token: string,
    tokenSecret: string
}
class Twitter extends Fetch {
    public auth: AUTHCREDENTIAL;
    constructor(obj: obj) {
        super()
        this.auth = {
            oauth_nonce: getRandom(6),
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: `${Math.floor(Date.now() / 1000)}`,
            oauth_consumer_key: obj.key,
            oauth_consumer_secret: obj.keySecret,
            oauth_token: obj.token,
            oauth_token_secret: obj.tokenSecret
        }
    }
}

const T = new Twitter(credential);
(async () => {
    let ids: any;
    try {
        ids = await T.fetch('https://api.twitter.com/1.1/followers/ids.json?screen_name=HypeleeAfrica', 'GET');
    } catch (e) {
        if (e) console.log('err:', e);
    }

    console.log(ids);
})();
