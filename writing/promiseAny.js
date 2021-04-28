/**
 * Promise.any()是ES2021新增的特性，它接收一个Promise可迭代对象（例如数组）
 * 只要其中的一个promise成功，就返回那个已经成功的Promise
 * 如果可迭代对象中没有一个成功（即所有的promises都失败），就返回一个失败的promise和AggregateError类型的实例，它是Error的一个子类，用于把单一的错误集合在一起
 */
const promises = [
    Promise.reject('ERROR A'),
    Promise.reject('ERROR B'),
    Promise.resolve('result'),
]

Promise.any(promises).then((value) => {
    console.log('value: ', value)
}).catch((err) => {
    console.log('err: ', err)
})

// value:  result

/**
 * Promise应用场景
 *  1. 从最快的服务器检索资源
 *      来自世界各地的用户访问网站，如果有多台服务器，则尽量使用响应速度最快的服务器，在这种情况下，可以使用Promise.any()方法从最快的服务器接收响应
 *
 *  2. 显示第一张已加载的图片
 *      假设我们有一个获取图片并返回blob的函数，我们使用Promise.any()来获取一些图片并显示第一张有效的图片（即最先resolved的那个promise）
 */
function getUser(endpoint) {
    return fetch(`https://superfire.${endpoint}.com/users`)
        .then(response => response.json());
}

const promises1 = [getUser("jp"), getUser("uk"), getUser("us"), getUser("au"), getUser("in")]

Promise.any(promises1).then(value => {
    console.log(value)
}).catch(err => {
    console.log(err);
})

function fetchAndDecode (url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error !status：${response.status}`);
        } else {
            return response.blob();
        }
    })
}

let coffee = fetchAndDecode('coffee.jpg');
let tea = fetchAndDecode('tea.jpg');

Promise.any([coffee, tea]).then(value => {
    let objectUrl = URL.createObjectURL(value);
    let image = document.createElement('img');
    image.src = objectUrl;
    document.body.appendChild(image)
}).catch(e => {
    console.log(e.message)
})


/**
 * Promise.any VS Promise.all
 * Promise.any()和Promise.all()从返回结果来看，它们彼此相反：
 *  1.Promise.all()：任意一个promise被reject，就会立即被reject，并且reject的是第一个抛出的错误信息，只有所有的promise都resolve时才会resolve所有的结果
 *  2.Promise.any()：任意一个promise被resolve，就会立即被resolve，并且resolve的是第一个正确结果，只有所有的promise都reject时才会reject所有的失败信息
 *
 * 另外，它们又有不同的重点：
 *  1. Promise.all()对所有实现都感兴趣。相反的情况（至少一个拒绝）导致拒绝
 *  2. Promise.any()对第一个实现感兴趣。相反的情况（所有拒绝）导致拒绝
 *
 * Promise.any  VS  Promise.race
 * Promise.any()和Promise.race()的关注点不一样：
 *  1.Promise.any()：关注于Promise是否已经解决
 *  2.Promise.race()：主要关注Promise是否已经解决，无论它是被解决还是被拒绝
 */

/**
 * 手写Promise.any实现
 *  Promise.any只要传入的promise有一个是fullfilled则立即resolve出去，否则将所有的reject结果收集起来并返回AggregateError
 */

MyPromise.any = function (promises) {
    return new Promise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises: []
        let len = promises.length;
        // 用于收集所有的reject
        let errs = [];
        // 如果传入的是一个空数组，那么直接返回AggregateError
        if (len === 0) return reject(new AggregateError('All promises were rejected'));
        promises.forEach((promise) => {
            promise.then(value => {
                resolve(value)
            }, err => {
                len--;
                errs.push(err);
                if (len === 0) {
                    reject(new AggregateError(errs))
                }
            })
        })
    })
}
