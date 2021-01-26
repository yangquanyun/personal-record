/**
 * 第一步 实现一个简单的Promise
 * 1. Promise是一个类
 * 2.执行器
 * 3.Promise状态
 *  Promise一共有三种状态，分别为成功（fulfilled）、失败（rejected）、等待（pending），一旦状态确定就不可修改
 *  只能pending --> fulfilled
 *  只能pending --> rejected
 *  结合上述表述，Promise就需要一个属性status和两个改变状态的函数resolve和reject并且执行器接收两个参数resolve和reject
 *  这两个函数使用来改变状态的，执行resolve函数将Promise状态改为 fulfilled 执行reject函数将Promise改为 rejected
 *  如果status值不是pending，则阻止程序向下执行
 *
 * 4.then函数
 *    a.then内部做的事情就是判断Promise状态；如果状态是成功，则调用成功的回调；如果是失败，则调用失败的回调
 *    b.then函数是定义在原型上的函数
 * 5.then成功回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败之后的原因
 *    a.当调用resolve的时候，将成功的值给Promise
 *    b.当调用reject的时候，将失败的原因给Promise
 *    c. 这些值在通过Promise对象给then的成功回调和失败回调
 */
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败
class MyPromise {
    constructor(executor) {
        // Promise创建立即执行执行器
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }

    }
    status = PENDING

    // 成功之后的值
    value = void 0
    //失败后的原因
    reason = void 0
    successCallback = []
    failCallback = []

    // 使用箭头函数是为了resolve和reject里面的this指向的是这个Promise对象
    resolve = value => {
        //如果状态不是pending，阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED
        this.value = value;
        while (this.successCallback.length) this.successCallback.shift()()
    }

    reject = reason => {
        // 如果状态不是pending阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED
        this.reason = reason
        while (this.failCallback.length)this.failCallback.shift()()
    }

    then (successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback()
        } else if (this.status === REJECTED) {
            failCallback()
        }
    }
}

new MyPromise((resolve, reject) => {
    resolve('');
})
