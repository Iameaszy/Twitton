import { stringify } from 'querystring';
import { Fetch } from "./fetch";
import { createServer } from 'http';


export interface myObj {
    stringify?: boolean;
    count?: number;
    cursor?: number;
}
const cache = { follower: [], id: [], prev: 0, next: 0 };

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
            // options.stringify_ids = obj.stringify ? obj.stringify : false;
        }
        options = stringify(options);
        this.fetch(`https://api.twitter.com/1.1/followers/ids.json?${options}`, 'GET')
            .then((val) => {
                console.log(val);
                createServer(function (req, res) {
                    res.statusCode = 200;
                    res.write(JSON.stringify(val));
                    res.end();
                }).listen(8000);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
    lookup(ids: number) {
        this.fetch(`https://api.twitter.com/1.1/users/lookup.json?${ids}`, 'POST').then((val) => {

        })
            .catch((err) => {
                throw new Error(err);
            });
    }
}
