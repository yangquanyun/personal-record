/**
 * 实现apply
 * 实现思路
 *  1.传递给函数的参数不太一样，其他部分跟call一样
 *  2.apply接受第二个参数为类数组对象
 */
Function.prototype.myApply = function (thisArg) {
    if (thisArg === null || thisArg === undefined) {
        thisArg = window;
    } else {
        thisArg = Object(thisArg);
    }

    // 判断是否为类数组
    function isArrayLike (o) {
        if (
            o && // o不是undefined、null等
            typeof o === 'object' && // o是对象
            isFinite(o.length) && // o.length是有限数值
            o.length >= 0 && // o.length为非负值
            o.length === Math.floor(o.length) && // o.length是整数
            o.length < 4294967296 // 2^32
        )
            return true
        else return false;
    }

    const specialMethod = Symbol('anything');
    thisArg[specialMethod] = this;
    let args = arguments[1]; // 获取参数数组
    let result;

    // 处理传进来的第二个参数
    if (args) {
        // 是否传递第二个参数
        if (!Array.isArray(args) && !isArrayLike(args)) {
            throw new TypeError('第二个参数既不为数组，也不为类数组对象。抛出错误');
        } else {
            args = Array.from(args); // 转为数组
            result = thisArg[specialMethod](...args); // 执行函数并展开数组，传递函数参数
        }
    } else {
        result = thisArg[specialMethod]();
    }
    delete thisArg[specialMethod];
    return result;
}
