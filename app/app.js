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
var fetch_1 = require("./fetch");
var followers_1 = require("./followers");
var mixin_1 = require("./mixin");
var followers_id_1 = require("./followers-id");
/* User Data */
var credential = {
    key: 'Frr2qLWTtMctBLin1t3NmtQa3',
    keySecret: 'xBVmlsMd1SwYYTxHHbRvQKtNtac2TpOL1MlnQfcOb9zIkO9i1C',
    token: '1696416332-ujOmuatoR2tgxBKkP8dm9sb0EatkQM3pIBfn7Kg',
    tokenSecret: 'llDeeqBD3ID4YuDcoYTEzbVIXzShKFTT5MTpc4ZGpwF6P'
};
exports.cache = { followers: { followers: [], prev: 0, next: 0 }, ids: { ids: [], prev: 0, next: 0 }, index: 0 };
process.on('unhandledRejection', function (p, reason) {
    console.log('unhandledRejection:', p, "reason:", reason);
});
var Twitter = /** @class */ (function (_super) {
    __extends(Twitter, _super);
    function Twitter(obj) {
        var _this = this;
        if (!obj) {
            throw new Error('You must enter an Object containing your details');
        }
        ['key', 'keySecret', 'token', 'tokenSecret'].forEach(function (val) {
            if (!obj.hasOwnProperty(val) || !obj[val]) {
                throw new Error(val + " property is required");
            }
        });
        _this = _super.call(this, obj) || this;
        return _this;
    }
    return Twitter;
}(fetch_1.Fetch));
mixin_1.mixin([followers_1.Followers, followers_id_1.FollowersId], Twitter);
var T = new Twitter(credential);
T.followers('HypeleeAfrica')
    .then((function (val) { return console.log(val); }))
    .catch(function (e) { throw e; });
//# sourceMappingURL=app.js.map