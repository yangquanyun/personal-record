/**
 *  实现一个异步求和函数（字节笔试题）
 *  题目： 提供一个异步add方法如下，需要实现一个 await sum(..args)函数
 *
 */
function asyncAdd(a, b, callback) {
    setTimeout(function () {
        callback(null, a + b);
    }, 1000);
}

// 简化：两数之和
async function sumT(a, b) {
    return await new Promise((resolve, reject) => {
        asyncAdd(a, b, (err, res) => {
            if (!err) {
                resolve(res)
            }
            reject(err)
        })
    })
}

// 测试
sumT(1,2).then(res => {
    console.log(res)
})



/**
 * 加深：多数之和
 *  提到数组求和求和，我们首先想到的是reduce
 *  reduce()方法对数组中的每个元素执行一个由您提供的reducer函数，将其结果汇总为单个返回值, 但这存在一个耗时较长的问题，我们可以计算下时间
 */
function sum(...args) {
    return new Promise(resolve => {
        args.reduce((acc, cur) => acc.then(total => sumT(total, cur)), Promise.resolve(0)).then(resolve);
    })
}

sum(1,2,3,4,5).then(res => {
    console.log(res)
})


/**
 * 优化：使用Promise.all
 * 我们可以两两一组，使用Promise.all求和，再把和两两一组求和。。。，直到只剩余一个就是最终的结果
 */
async function summation(...args) {
    // 用于考察每次迭代的过程
    console.log(args)

    // 如果仅有一个，直接返回
    if (args.length === 1) return args[0]
    let result = [];
    //两两一组，如果有剩余一个，直接进入
    for (let i = 0; i < args.length - 1; i+= 2) {
        result.push(sumT(args[i], args[i + 1]))
    }
    if (args.length % 2) result.push(args[args.length - 1])

    // Promise.all组内求和
    return summation(...await Promise.all(result));
}

summation(1,2,3,4,5).then(res => {
    console.log(res, '***')
})
