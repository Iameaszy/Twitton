"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mixin(baseCtor, deriveCtor) {
    if (!Array.isArray(baseCtor) || typeof deriveCtor !== 'function') {
        throw new Error('both base and derived must be a function or a class or an array');
    }
    baseCtor.forEach(function (base) {
        Object.getOwnPropertyNames(base.prototype).forEach(function (name) {
            if (name !== 'constructor') {
                deriveCtor.prototype[name] = base.prototype[name];
            }
        });
    });
}
exports.mixin = mixin;
//# sourceMappingURL=mixin.js.map