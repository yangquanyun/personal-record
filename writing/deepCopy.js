/**
 * 深拷贝：从堆内存中开辟一个新的区域存放新对象，对对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响
 */

/**
 * 第一种：JSON.parse(JSON.stringify())
 * 利用JSON.stringify将对象转成JSON字符串，再用JSON.parse把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈
 * 重点：虽然可以实现数组或对象深拷贝，但不能处理函数和正则，因为这两者基于JSON.stringify和JSON.parse处理后，得到的正则就不再是正则（变为空对象），得到的函数也变为Null了
 */

/**
 * 第二种：最基本的深拷贝
 * 实现了普通对象、数组和函数的深拷贝，但是未解决循环引用、Date、RegExp
 */
function deepCopy (obj) {
    if (!obj && typeof obj !== 'object') {
        throw new Error('error arguments');
    }
    const targetObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        // 只对对象自有属性进行拷贝
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
                targetObj[key] = deepCopy(obj[key]);
            } else {
                targetObj[key] = obj[key];
            }
        }
    }
    return targetObj;
}

/**
 * 第三种：Vuex源码——未考虑正则、日期时间
 * Vuex源码中的DeepCopy解决循环引用，但未解决Date和RegExp
 */
function deepCopy2 (obj, cache = []) {
    function find (list, f) {
        return list.filter(f)[0];
    }

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy,
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}

/**
 * 优化Vuex中的DeepCopy解决Date和RegExp
 */
function deepCopy3 (obj, cache = []) {
    function find (list, f) {
        return list.filter(f)[0];
    }

    const Constructor = obj.constructor;
    // just return if obj is immutable value
    if (typeof obj !== 'object') {
        return obj;
    } else if (Constructor === RegExp) {
        return new Constructor(obj);
    } else if (Constructor === Date) {
        return new Constructor(obj.getTime());
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
        return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy,
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}
