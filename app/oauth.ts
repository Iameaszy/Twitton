import { basename } from 'path';
import { AUTHCREDENTIAL } from '../util/signature';
import { Fetch } from './fetch';
import { getRandom } from '../util/myUtil';
import { Followers } from './followers';

interface obj {
    key: string;
    keySecret: string;
    token: string;
    tokenSecret: string;
}
export abstract class Auth {
    protected auth: AUTHCREDENTIAL;
    constructor(obj: obj) {
        this.auth = {
            oauth_nonce: getRandom(6),
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: `${Math.floor(Date.now() / 1000)}`,
            oauth_consumer_key: obj.key,
            oauth_consumer_secret: obj.keySecret,
            oauth_token: obj.token,
            oauth_token_secret: obj.tokenSecret
        };
    }
}
