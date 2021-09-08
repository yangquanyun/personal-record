/**
 * 实现Promise.all
 * Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
 * @param promises
 * @return {Promise<unknown>}
 */
function promiseAll (promises) {
    if (!Array.isArray(promises)) {
        throw new Error ('promises must be an array');
    }

    return new Promise((resolve, reject) => {
        const promiseNum = promises.length;
        let resolvedCount = 0;
        let resolveValues = new Array(promiseNum);

        try {
            for (let i = 0; i < promiseNum; i++) {
                promises[i].then((value) => {
                    resolveValues[i] = value;
                    if (++resolvedCount === promiseNum) {
                        resolve(resolveValues);
                    }
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 例题： 实现一个 run() 函数，可以批量异步的执行请求，但最终得到的结果顺序要和输入顺序保持一致（不能使用 Promise.all()）
    function run(fetchs = []) {
        // 实现 run 函数
    }

    function delay(str) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(str)
            }, Math.random() * 1000)
        })
    }

    // 批量执行 5 个请求
    run([delay('A'), delay('B'), delay('C'), delay('D'), delay('E')]).then(res => {
        console.log(res) // ["A", "B", "C", "D", "E"] 结果和输入顺序保持一致
    })
 */

function run (fetchs = []) {
    return new Promise((resolve, reject) => {
        const fetchsNum = fetchs.length;
        let resolvedCount = 0;
        let resolveValues = new Array(fetchsNum);

        try {
            for (let i = 0; i < fetchsNum; i++) {
                fetchs[i].then(value => {
                    resolveValues[i] = value;

                    if (++resolvedCount === fetchsNum) {
                        resolve(resolveValues);
                    }
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

function delay(str) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(str)
        }, Math.random() * 1000)
    })
}

run([delay('A'), delay('B'), delay('C'), delay('D'), delay('E')]).then(res => {
    console.log(res)
})
