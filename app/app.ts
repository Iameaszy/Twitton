import { Fetch } from "./fetch";
import { Followers } from "./followers";
import { mixin } from "./mixin";
import { FollowersId } from "./followers-id";


/* User Data */
const credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};

export interface myObj {
    stringify?: boolean;
    count?: number;
    cursor?: number;
    status?: boolean;
}

interface cache {
    followers: { followers: any[], prev: number, next: number };
    ids: { ids: any[], prev: number, next: number };
}

export const cache: any = { followers: { followers: [], prev: 0, next: 0 }, ids: { ids: [], prev: 0, next: 0 }, index: 0 };

process.on('unhandledRejection', (p, reason) => {
    console.log('unhandledRejection:', p, "reason:", reason);
});

interface Twitter {
    followers(id: number | string, obj?: myObj): Promise<any>;
    [index: string]: any;
}
class Twitter extends Fetch {
    constructor(obj: any) {
        if (!obj) {
            throw new Error('You must enter an Object containing your details');
        }
        ['key', 'keySecret', 'token', 'tokenSecret'].forEach(val => {
            if (!obj.hasOwnProperty(val) || !obj[val]) {
                throw new Error(`${val} property is required`);
            }
        });
        super(obj);
    }
}


mixin([Followers, FollowersId], Twitter);
const T = new Twitter(credential);
T.followers('HypeleeAfrica')
    .then((val => console.log(val)))
    .catch(e => { throw e; });
