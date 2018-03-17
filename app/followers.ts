import { stringify } from 'querystring';
import { Fetch } from "./fetch";
import { createServer } from 'http';


export interface myObj {
    stringify?: boolean;
    count?: number;
    cursor?: number;
}
const cache: any = { followers: [], ids: [], prev: 0, next: 0, index: 0 };

export abstract class Followers extends Fetch {
    followers(id: number | string, obj: myObj = { count: 5000, cursor: -1, stringify: false }) {
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
            options.count = obj.count ? obj.count : 5000;
            options.cursor = obj.cursor ? obj.cursor : -1;
            options.stringify_ids = obj.stringify ? obj.stringify : false;
        }
        options = stringify(options);
        this.fetch(`https://api.twitter.com/1.1/followers/ids.json?${options}`, 'GET')
            .then((val: any) => {
                cache.ids.push(val.ids);
                cache.next = val.next_cursor;
                cache.prev = val.prev_cursor;
                let index = cache.index, result: any;

                while (index < cache.ids.length) {
                    result = this.lookup(cache.ids.slice(index, index + 100));
                    cache.followers.push(val);
                    index += 100;
                }

                console.log(cache.followers);
                index = cache.index = cache.ids.length = 0;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
    lookup(ids: number) {
        let val: any;
        (async () => {
            try {
                val = await this.fetch(`https://api.twitter.com/1.1/users/lookup.json?${ids}`, 'POST');
            } catch (e) {
                throw e;
            }
        })();
        return val;

    }
}
