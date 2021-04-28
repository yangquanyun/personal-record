/**
 * 题目：实现arr[-1]的访问，例如arr = 【1,2,3】, arr[-1] = 3
 * 解题思路：计算倒序对应的正序的位置
 */
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    };
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');
console.log(arr[-1]); // c
