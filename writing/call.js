/**
 * 实现call
 * 实现思路
 *  1.参考call的语法规则，需要设置一个参数thisArg,也就是this的指向
 *  2.将thisArg封装为一个Object
 *  3.通过为thisArg创建一个临时方法，这样thisArg就是调用该临时方法的对象了，会将该临时方法的this隐式指向到thisArg上
 *  4.执行thisArg的临时方法，并传递参数
 *  5.删除临时方法，返回方法的执行结果
 */
Function.prototype.myCall = function(thisArg, ...arr) {
    // 1.判断参数合法性
    if (thisArg === null || thisArg === undefined) {
        // 指定为Null和Undefined的this值会自动指向全局对象
        thisArg = window;
    } else {
        // 创建一个可包含数字/字符串/布尔值的对象，thisArg会指向一个包含该原始值的对象
        thisArg = Object(thisArg);
    }

    // 2.搞定this的指向
    const specialMethod = Symbol('anything'); // 创建一个不重复的常量
    // 如果调用myCall的函数名是func，也即以func.myCall()形式调用
    // 给thisArg对象建一个临时属性来储存this（也即func函数）
    thisArg[specialMethod] = this;

    let result = thisArg[specialMethod](...arr);

    // 3.收尾
    delete thisArg[specialMethod]; // 删除临时方法
    return result;  // 返回临时方法的执行结果
}

// DEMO
let obj = {
    name: 'YQY'
}

function func() {
    console.log(this.name);
}
func.myCall(obj);
