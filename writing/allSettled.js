/**
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
