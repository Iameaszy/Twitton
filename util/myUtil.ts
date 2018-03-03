const bytes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('');
const length = bytes.length;

export function getRandom(num: number) {
    if (typeof num !== 'number') {
        throw new Error('Enter a valid number');
    }
    let rnd = '';
    for (let i = 0; i < num; i++) {
        rnd += bytes[Math.floor(Math.random() * length)];
    }

    return rnd;
}


export function sortObject(obj: { [index: string]: any }) {
    const sortedObj: {
        [index: string]: any
    } = {};
    Object.keys(obj).sort().forEach((val) => {
        sortedObj[val] = obj[val];
    });
    return sortedObj;
}
