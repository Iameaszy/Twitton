export function mixin(baseCtor: any, deriveCtor: any) {
    if (!Array.isArray(baseCtor) || typeof deriveCtor !== 'function') {
        throw new Error('both base and derived must be a function or a class or an array');
    }

    baseCtor.forEach((base: any) => {
        Object.getOwnPropertyNames(base.prototype).forEach(name => {
            if (name !== 'constructor') {
                deriveCtor.prototype[name] = base.prototype[name];
            }
        });
    });

}
