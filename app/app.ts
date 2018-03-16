import { Fetch } from "./fetch";
import { Followers, myObj } from "./followers";


/* User Data */
const credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};

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


function Mixin(baseCtor: any, deriveCtor: any) {
    if (!Array.isArray(baseCtor) || typeof deriveCtor !== 'function') {
        throw new Error('both base and derived must be a function or a class or an array');
    }

    baseCtor.forEach((base: any) => {
        Object.getOwnPropertyNames(base.prototype).forEach(name => {
            if (name !== 'constructor') {
                deriveCtor.prototype[name] = base.prototype[name];
            }
        });
    });

}

Mixin([Followers], Twitter);
const T = new Twitter(credential);
T.followers('HypeleeAfrica');
