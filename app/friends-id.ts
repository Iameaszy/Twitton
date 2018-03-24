import { stringify } from 'querystring';


import { cache, myObj } from './app';
import { Fetch } from "./fetch";


export abstract class FriendsId extends Fetch {
    friends(id: number | string, obj: myObj = { count: 5000, cursor: -1, stringify: false }) {
        if (!id) {
            throw new Error('id must be a string or  number');
        }

        const isNumber = typeof id === 'number' ? true : false;
        let options: any = {};
        if (isNumber) {
            options.user_id = id;
        } else {
            options.screen_name = id;
        }
        if (obj) {
            options.count = obj.count ? obj.count : 100;
            options.cursor = obj.cursor ? obj.cursor : -1;
            options.stringify_id = obj.stringify ? obj.stringify : false;

        }
        options = stringify(options);
        return this.fetch(`https://api.twitter.com/1.1/friends/ids.json?${options}`, 'POST');
    }
}
