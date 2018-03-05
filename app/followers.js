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
var Followers = /** @class */ (function (_super) {
    __extends(Followers, _super);
    function Followers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Followers.prototype.followers = function () { };
    return Followers;
}(fetch_1.Fetch));
exports.Followers = Followers;
//# sourceMappingURL=followers.js.map