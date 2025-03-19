function deepCopy(origin) {
    const chckMap = new WeakMap();

    function copy(origin) {
        if (typeof origin !== 'object' || origin === null) {
            return origin;
        }

        if (chckMap.has(origin)) {
            return chckMap.get(origin);
        }

        const copy_origin = Object.create(Object.getPrototypeOf(origin));
        chckMap.set(origin, copy_origin);

        for (const key in origin) {
            if (origin.hasOwnProperty(key)) {
                const value = origin[key];
                
                if (value instanceof Date) {
                    copy_origin[key] = new Date(value.getTime());
                } else if (value instanceof Map) {
                    copy_origin[key] = new Map(Array.from(value, ([k, v]) => [k, copy(v)]));
                } else if (value instanceof Set) {
                    copy_origin[key] = new Set(Array.from(value).map(item => copy(item)));
                } else if (Array.isArray(value)) {
                    copy_origin[key] = value.map(item => copy(item));
                } else if (typeof value === 'object') {
                    copy_origin[key] = copy(value);
                } else {
                    copy_origin[key] = value;
                }
            }
        }

        return copy_origin;
    }

    return copy(origin);
}

// Чек реквест

/* 
const origin1 = { name: 'Alex', age: 24 };
const copy1 = deepCopy(origin1);
console.log(copy1);

const origin2 = {
    details: {
        address: {
            city: 'Тюмень',
            country: 'Россия'
        }
    },
    list: ['Яблоко', 'Банан', 'Вишня'],
    map: new Map([['2025', 'год'], ['2026', 'год']]),
    date: [new Date(2025, 0, 1), new Date(2026, 1, 1)]
};
const copy2 = deepCopy(origin2);
console.log(copy2);

const origin3 = { name: 'Cyclic' };
origin3.self = origin3;
const copy3 = deepCopy(origin3);
console.log(copy3.self === copy3);

const origin4 = {
    greet: function() { return 'Hello'; },
    [Symbol.for('id')]: 123
};
const copy4 = deepCopy(origin4);
console.log(copy4.greet()); 
console.log(copy4[Symbol.for('id')]); 

function fconstr(name) {
    this.name = name;
}
fconstr.prototype.greet = function() {
    return `Hello, my name is ${this.name}`;
};
const origin5 = new fconstr('Alex');
const copy5 = deepCopy(origin5);
console.log(copy5.greet()); 
*/