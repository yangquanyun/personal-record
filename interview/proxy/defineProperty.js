let user = {
    name : 'sisterAn'
}

Object.defineProperty(user, 'name', {
    enumerable: true,
    configurable: true,
    set: function (newVal) {
        this._name = newVal;
        console.log('set: ' + this._name);
    },
    get: function () {
        console.log('get: ' + this._name);
        return this._name;
    }
})

user.name = 'an';
console.log(user.name);

// 如果是完整的对变量的每一个子属性进行监听：
function observe(obj) {
    // 遍历对象，使用get/set重新定义对象的每个属性值
    Object.keys(obj).map(key => {
        defineReactive(obj, key, obj[key]);
    });
}

function defineReactive (obj, k, v) {
    // 递归子属性
    if (typeof (v) === 'object') observe(v)

    // 重新定义get/set
    Object.defineProperty(obj, k, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log('get: ' + v);
            return v;
        },
        // 重新设置值时，触发收集器的通知机制
        set: function reactiveSetter(newVal) {
            console.log('set:' + newVal);
            v = newVal;
        }
    })
}

let data = {a: 1}
observe(data);
console.log(data.a);
data.a = 2;

// 对于数组而言，Vue内部重写了以下函数实现派发更新
// 获得数组原型
const arrayProto = Array.prototype;

export const arrayMethods = Object.create(arrayProto);

// 重写以下函数
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(function (method) {
    // 缓存原生函数
    const original = arrayProto[method];

    // 重写函数
    def(arrayMethods, method, function mutator(...args) {
        // 先调用原生函数获得结果
        const result = original.apply(this, args);
        const ob = this.__ob__;
        let inserted;

        // 调用以下几个函数时，监听新数据
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted) ob.observeArray(inserted)
        // 手动派发更新
        ob.dep.notify();
        return result
    })
})
