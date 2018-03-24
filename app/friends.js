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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var querystring_1 = require("querystring");
var fetch_1 = require("./fetch");
var Friends = /** @class */ (function (_super) {
    __extends(Friends, _super);
    function Friends() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Friends.prototype.friends = function (id, obj) {
        if (obj === void 0) { obj = { count: 20, cursor: -1, status: false }; }
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
            options.count = obj.count ? obj.count : 100;
            options.cursor = obj.cursor ? obj.cursor : -1;
            options.skip_status = obj.status ? obj.status : false;
        }
        options = querystring_1.stringify(options);
        var p = this.fetch("https://api.twitter.com/1.1/friends/list.json?" + options, 'GET');
        p.then(function (val) {
            (_a = app_1.cache.friends).push.apply(_a, __spread(val.users));
            var _a;
        });
        return p;
    };
    return Friends;
}(fetch_1.Fetch));
exports.Friends = Friends;
//# sourceMappingURL=friends.js.map