import { myObj } from './app';
import { stringify } from 'querystring';
import { Fetch } from "./fetch";


export abstract class FriendReq extends Fetch {
    fRequest(ids: string | any[], obj: myObj = { cursor: -1, stringify: false }) {
        if (!ids) {
            throw new Error('id can\'t be empty');
        }
        if (!Array.isArray(ids) && typeof ids !== 'string') {
            throw new Error('id must be an array or a string');
        }
        let options: any = {};
        if (obj) {
            options.cursor = obj.cursor ? obj.cursor : -1;
            options.stringify_id = obj.stringify ? obj.stringify : false;

        }
        options = stringify(options);
        return this.fetch(`https://api.twitter.com/1.1/friendships/incoming.json?${options}`, 'POST');
    }
}
