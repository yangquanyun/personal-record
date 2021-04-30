/**
 * https://mp.weixin.qq.com/s/eHZl-sP2TySpN7tSqvLlYA
 * Promise.prototype.finally()的作用
 *  Promise.prototype.finally()是ES2018新增的特性，它返回一个promise，在promise结束时，无论Promise运行成功还是失败，都会运行finally
 *  类似于我们常用的try{}catch{}finally{}
 *
 *  Promise.prototype.finally避免了同样的语句需要在then()和catch()中各写一次的情况
 *
 *  注意：
 *      1.finally没有参数
 *      2.finally会将结果和error传递
 */

/**
 * 手写一个Promise.prototype.finally()
 * 不管Promise对象最后状态如何，都会执行的操作
 */
MyPromise.prototype.finally = function (cb) {
    return this.then(function (value) {
        return MyPromise.resolve(cb()).then(function () {
            return value;
        })
    }, function (err) {
        return MyPromise.resolve(cb()).then(function () {
            throw err
        })
    })
}


