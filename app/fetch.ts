import { request } from "https";
import { getSign } from "../util/signature";
import { Auth } from "./oauth";
import { parse } from "url";
import { stringify } from "querystring";
import { ClientRequest } from "http";
type METHOD = 'POST' | 'PUT' | 'GET' | 'DELETE';



export abstract class Fetch extends Auth {
    protected fetch(url: string | { host: string, path: string, params: any }, method: METHOD) {
        let req: ClientRequest;
        let signature: any;
        let parsedUrl: any;
        if (typeof url === 'string') {
            signature = getSign(url, this.auth, method);
            parsedUrl = parse(url);
            req = request({
                method: method,
                host: parsedUrl.host,
                path: parsedUrl.path
            });
        } else {
            let search = "";
            if (url['params']) {
                search += '?' + stringify(url.params);
            }
            console.log(url);
            req = request({
                method: method,
                host: url.host,
                path: url.path + search
            });
            signature = getSign(`https://${url.host}${url.path}${search}`, this.auth, method);
        }
        return new Promise((resolve, reject) => {
            req.on('response', (res) => {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', (chunk: string) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', (err) => {
                reject({ err: err });
            });
            req.setHeader('Authorization', 'OAuth oauth_consumer_key="' + this.auth.oauth_consumer_key + '",oauth_token="' + this.auth.oauth_token + '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + this.auth.oauth_timestamp + '",oauth_nonce="' + this.auth.oauth_nonce + '",oauth_version="1.0",oauth_signature="' + signature + '"');
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.end();
        });
    }
}
