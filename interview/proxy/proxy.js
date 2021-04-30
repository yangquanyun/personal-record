// let handler = {
//     get: function (target, name) {
//         return name in target ? target[name] : 'no prop!';
//     },
//     set: function (target, prop, value, receiver) {
//         target[prop] = value;
//         console.log('property set: ' + prop + ' = ' + value);
//         return true;
//     }
// }
//
// let user = new Proxy({}, handler);
// user.name = 'an';
// console.log(user.name);
// console.log(user.age);

/**
 * 通过Proxy自定义获取、增加、删除等行为
 */
const toProxy = new WeakMap(); // 存放被代理过的对象
const toRaw = new WeakMap(); // 存放已经代理过的对象
function reactive(target) {
    // 创建响应式对象
    return createReactiveObject(target);
}

function isObject(target) {
    return typeof target === 'object' && target !== null;
}

function hasOwn(target, key) {
    return target.hasOwnProperty(key);
}

function createReactiveObject(target) {
    if (!isObject(target)) {
        return target;
    }
    let observed = toProxy.get(target);
    if (observed) { // 判断是否被代理过
        return observed;
    }

    if (toRaw.has(target)) { // 判断是否要重复代理
        return target;
    }

    const handlers = {
        get (target, key, receiver) {
            let res = Reflect.get(target, key, receiver);
            track(target, 'get', key); // 依赖收集
            return isObject(res) ? reactive(res) : res;
        },
        set (target,key,value,receiver) {
            let oldValue = target[key];
            let hadKey = hasOwn(target,key);
            let result = Reflect.set(target, key, value, receiver);
            if(!hadKey){
                trigger(target,'add',key); // 触发添加
            }else if(oldValue !== value){
                trigger(target,'set',key); // 触发修改
            }
            return result;
        },
        deleteProperty(target, key) {
            console.log("删除");
            return Reflect.deleteProperty(target, key);
        }
    }
    // 开始代理
    observed = new Proxy(target, handlers);
    toProxy.set(target,observed);
    toRaw.set(observed,target); // 做映射表
    return observed;
}

