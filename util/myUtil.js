"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('');
var length = bytes.length;
function getRandom(num) {
    if (typeof num !== 'number') {
        throw new Error('Enter a valid number');
    }
    var rnd = '';
    for (var i = 0; i < num; i++) {
        rnd += bytes[Math.floor(Math.random() * length)];
    }
    return rnd;
}
exports.getRandom = getRandom;
function sortObject(obj) {
    var sortedObj = {};
    Object.keys(obj).sort().forEach(function (val) {
        sortedObj[val] = obj[val];
    });
    return sortedObj;
}
exports.sortObject = sortObject;
//# sourceMappingURL=myUtil.js.map