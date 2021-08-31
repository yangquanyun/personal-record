/**
 * apply、call、bind的区别：
 *  1.三者都可以改变函数的this指向
 *  2.三者的第一个参数都是this要指向的对象，如果没有这个参数或参数为undefined或null，则默认指向全局window
 *  3.三者都有可以传参，但是apply是数组,call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
 *  4.bind是返回绑定this之后的函数，apply、call则是立即执行
 */

/**
 * 1.返回新函数，调用新函数的返回值与调用旧函数的返回值相同
 * 2.新函数的this指向bind的第一个参数
 * 3.其余参数将在新函数后续被调用时位于其它实参前被传入
 * 4.新函数也能使用new操作符创建对象，构造器为原函数
 */

Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    // 获取参数
    const args = [...arguments].slice(1),
          fn = this;

    return function Fn() {
        // 根据调用方式传入不同绑定值
        return fn.apply(this instanceof Fn ? new Fn(...arguments) : context, args.concat(...arguments));
    }
}

/**
 * 实现bind
 * 实现思路
 *  1.拷贝调用函数
 *   a.调用函数，也即调用myBind的函数，用一个变量临时储存它
 *   b.使用Object.create复制调用函数的prototype给funcForBind
 *  2. 返回拷贝的函数funcForBind
 *  3.调用拷贝的函数funcForBind
 *   a.new调用判断：通过instanceof判断函数是否通过new调用，来决定绑定的context
 *   b.通过call绑定this、传递参数
 *   c。返回调用函数的执行结果
 */
Function.prototype.myBind1 = function (objThis, ...params) {
    const thisFn = this; // 存储调用函数，以及函数参数

    // 对返回的函数 secondParams二次传参
    let funcForBind = function(...secondParams) {
        // 检查this是否是funcForBind的实例？也就是检查funcForBind是否通过new调用
        const isNew = this instanceof funcForBind;

        // new调用就绑定到this上，否则就绑定到传入的objThis上
        const thisArg = isNew ? this : Object(objThis);

        // 用call执行调用函数，绑定this的指向，并传递参数，返回执行结果
        return thisFn.call(thisArg, ...params, ...secondParams);
    };

    //复制调用函数的prototype给funcForBind
    funcForBind.prototype = Object.create(thisFn.prototype);
    return funcForBind; // 返回拷贝的函数
}
