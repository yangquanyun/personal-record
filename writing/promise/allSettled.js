/**
 * https://mp.weixin.qq.com/s/cvMQm8md4-g-FQZeHaPjrQ
 * Promise.all()的缺陷
 *  我们使用Promise.all()执行过每个promise时，只要其中任何一个promise失败都会执行reject，并且reject的是第一个抛出的错误信息，只有所有的promise都resolve时才调用.then中的成功回调
 */
// const p1 = Promise.resolve(1)
// const p2 = Promise.resolve(2)
// const p3 = new Promise((resolve, reject) => {
//     setTimeout(reject, 1000, 'three');
// });
//
// Promise.all([p1, p2, p3])
//     .then(values => {
//         console.log('resolve: ', values)
//     }).catch(err => {
//     console.log('reject: ', err)
// })

// reject:  three
// 注意：其中任意一个promise被reject，Promise.all就会立即被reject，数组中其他未执行完的promise依然是在执行的，Promise.all没有采取任何措施来取消它们的执行
// 但是大多数场景中，我们期望传入的这组promise无论执行成功或失败，都能获取每个promise的执行结果，为此，ES2020引入了Promise.allSettled()

/**
 * Promise.allSettled()可以获取数组中每个promise的结果，无论成功或失败
 */
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 'three');
});

Promise.allSettled([p1, p2, p3])
    .then(values => {
        console.log(values)
    })

/*
[
  {status: "fulfilled", value: 1},
  {status: "fulfilled", value: 2},
  {status: "rejected", reason: "three"}
]
*/

//如果浏览器不支持Promise.allSettled，可以如此polyfill:
if (!Promise.allSettled) {
    const rejectHandler = reason => ({status: 'rejected', reason});
    const resolveHandler = value => ({status: 'fulfilled', value});
    Promise.allSettled = promises =>
        Promise.all(
            promises.map((promise) =>
                Promise.resolve(promise).then(resolveHandler, rejectHandler)
            )
            // 每个promise需要用Promise.resolve包裹下，以防传递非promise
        );
}


/**
 * Promise.allSettled()与Promise.all()各自的适用场景
 *  allSettled更适合：
 *      1.彼此不依赖，其中任何一个被reject，对其它都没有影响
 *      2.期望知道每个promise的执行结果
 *  all更适合：
 *      1.彼此相互依赖，其中任何一个被reject，其他都失去了实际价值
 */

/**
 * 手写Promise.allSettled源码
 *      与Promise.all不同的是，当promise被reject之后，我们不会直接reject，而是记录下该reject的值和对应的状态“rejected”
 *      同样地，当promise对象被resolve时我们也不仅仅局限于记录值，同时也会记录状态"fulfilled"
 *      当所有的promise对象都已执行（解决或拒绝），我们统一resolve所有的promise执行结果数组
 */
MyPromise.allSettled = function (promises) {
    return new MyPromise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises : [];
        let len = promises.length;
        const argsLen = len

        // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
        if (len === 0) return resolve([])
        // 将传入的参数转换为数组，赋给args变量
        let args = Array.prototype.slice.call(promises);
        // 计算当前是否所有的promise执行完成，执行完毕则resolve
        const compute = () => {
            if(--len === 0) {
                resolve(args)
            }
        }
        function resolvePromise (index, value) {
            // 判断传入的是否是promise类型
            if (value instanceof MyPromise) {
                const then = value.then;
                then.call(value, function (val) {
                    args[index] = {status: 'fulfilled', value: val}
                    compute();
                }, function (e) {
                    args[index] = {status: 'rejected', reason: e}
                    compute();
                });
            } else {
                args[index] = {status: 'fulfilled', value: value}
                compute();
            }
        }
        for (let i = 0; i < argsLen; i++) {
            resolvePromise(i, args[i])
        }
    })
}
