import { cache, myObj } from './app';
import { stringify } from 'querystring';
import { Fetch } from "./fetch";
import { createServer } from 'http';


export abstract class Followers extends Fetch {
    followers(id: number | string, obj: myObj = { count: 20, cursor: -1, status: false }) {
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
            options.skip_status = obj.status ? obj.status : false;
        }
        options = stringify(options);
        this.fetch(`https://api.twitter.com/1.1/followers/list.json?${options}`, 'GET')
            .then((val: any) => {
                cache.followers.push(...val.users);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
}

