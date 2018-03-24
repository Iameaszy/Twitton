import { myObj } from './app';
import { stringify } from 'querystring';
import { Fetch } from "./fetch";


export abstract class FriendReq extends Fetch {
    fRequest(obj: myObj = { cursor: -1, stringify: false }) {

        let options: any = {};
        if (obj) {
            options.cursor = obj.cursor ? obj.cursor : -1;
            options.stringify_id = obj.stringify ? obj.stringify : false;

        }
        options = stringify(options);
        return this.fetch(`https://api.twitter.com/1.1/friendships/incoming.json?${options}`, 'POST');
    }
}
