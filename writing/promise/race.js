/**
 * 实现Promise.race()
 * Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
 */


function promiseRace (promises) {
    if (!Array.isArray(promises)) {
        throw new Error('promises must be an array');
    }

    return new Promise((resolve, reject) => {
        try {
            promises.forEach( p => {
                Promise.resolve(p).then(data => {
                    resolve(data);
                }, err => {
                    reject(err)
                })
            })
        } catch (e) {
            reject(e);
        }
    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    },1000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('failed')
    }, 500)
})

promiseRace([p1, p2]).then((result) => {
    console.log(result, '/...........');
}).catch((error) => {
    console.log(error, '/************');
})
