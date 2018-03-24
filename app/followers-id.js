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
var FollowersId = /** @class */ (function (_super) {
    __extends(FollowersId, _super);
    function FollowersId() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FollowersId.prototype.followersId = function (id, obj) {
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
            options.count = obj.count ? obj.count : 100;
            options.cursor = obj.cursor ? obj.cursor : -1;
            options.stringify_id = obj.stringify ? obj.stringify : false;
        }
        options = querystring_1.stringify(options);
        return this.fetch("https://api.twitter.com/1.1/followers/id.json?" + options, 'POST');
    };
    return FollowersId;
}(fetch_1.Fetch));
exports.FollowersId = FollowersId;
//# sourceMappingURL=followers-id.js.map