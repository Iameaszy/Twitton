"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
var fetch_1 = require("./fetch");
var http_1 = require("http");
var cache = { follower: [], id: [], prev: 0, next: 0 };
var Followers = /** @class */ (function (_super) {
    __extends(Followers, _super);
    function Followers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Followers.prototype.followers = function (id, obj) {
        if (obj === void 0) { obj = { count: 5000, cursor: -1, stringify: false }; }
        if (!id) {
            throw new Error('id must be a string or  number');
        }
        var isNumber = typeof id === 'number' ? true : false;
        var options = {};
        if (isNumber) {
            options.user_id = id;
        }
        else {
            options.screen_name = id;
        }
        if (obj) {
            options.count = obj.count ? obj.count : 5000;
            options.cursor = obj.cursor ? obj.cursor : -1;
            // options.stringify_ids = obj.stringify ? obj.stringify : false;
        }
        options = querystring_1.stringify(options);
        this.fetch("https://api.twitter.com/1.1/followers/ids.json?" + options, 'GET')
            .then(function (val) {
            console.log(val);
            http_1.createServer(function (req, res) {
                res.statusCode = 200;
                res.write(JSON.stringify(val));
                res.end();
            }).listen(8000);
        })
            .catch(function (err) {
            throw new Error(err);
        });
    };
    Followers.prototype.lookup = function (ids) {
        this.fetch("https://api.twitter.com/1.1/users/lookup.json?" + ids, 'POST').then(function (val) {
        })
            .catch(function (err) {
            throw new Error(err);
        });
    };
    return Followers;
}(fetch_1.Fetch));
exports.Followers = Followers;
//# sourceMappingURL=followers.js.map