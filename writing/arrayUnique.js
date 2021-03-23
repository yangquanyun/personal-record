// 问题描述：数组去重，顾名思义就是把数组里的重复数值去除，使其多个相同的数值变为一个，最后使数组里不含有重复数值
// 参考链接：https://juejin.cn/post/6942435294549377054?utm_source=gold_browser_extension#heading-0

/**
 * 解法一：使用双重for循环 + splice
 * @param arr
 */
function unique1(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                // 第一个等同于第二个，splice方法删除第二个
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/**
 * 解法二：使用indexOf/includes + 新数组
 * @param arr
 */
function unique2(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        // indexOf返回-1表示在新数组中不存在该元素
        // if(newArr.indexOf(arr[i]) === -1) {
        //     newArr.push(arr[i]);
        // }
        if(!newArr.includes(arr[i])) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
 * 解法三：使用sort方法先排序，使相同的元素都相邻
 * sort方法用于从小到大排序（返回一个新数组），其参数中如果不带回调函数就会在两位数及以上时出现排序错误（如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序）
 * 所以自己要写一个排序标准，当回调函数返回值大于0时两个值调换顺序
 * @param arr
 */
function unique3(arr) {
    arr = arr.sort((a, b) => a - b); // sort先按照从小到大排序
    let newArr = [arr[0]];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] !== arr[i - 1]) {
            newArr.push(arr[i]);
        }
    }
    return newArr
}

/**
 * 解法四：使用ES6中新增的数据结构Set
 * Set对象是值的集合，可以按照插入的顺序迭代它的元素。Set中的元素只会出现一次，即Set中的元素是唯一的
 * @param arr
 */
function unique4(arr) {
    const result = new Set(arr);
    // 使用扩展运算符将Set数据结构转为数组
    return [...result];
}

/**
 * 解法五：使用Map数据结构
 * Map对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值
 *  Map.prototype.has(key)——返回一个布尔值，表示Map实例是否包含键对应的值
 *  Map.prototype.set(key, value)设置Map对象中键的值，返回该Map对象
 * @param arr
 */
function unique5(arr) {
    let map = new Map();
    let newArr = []; // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
        // 如果有该key值
        if (map.has(arr[i])) {
            map.set(arr[i], true)
        } else {
            map.set(arr[i], false);
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
 * 解法六：使用filter
 * filter()方法创建一个新数组，其包含满足筛选条件的所有元素，其回调函数包含三个参数
 * （当前元素，索引值，调用了filter的数组本身）
 * @param arr
 */
function unique6(arr) {
    return arr.filter((item, index, arr) => {
        // 当前元素，在原始数组中的第一个索引 === 当前索引值，否则返回当前元素
        // 不是那么就证明是重复项，就舍弃
        return arr.indexOf(item) === index;
    })
}

/**
 * 解法七： 使用reduce + includes
 * @param arr
 */
function unique7(arr) {
    return arr.reduce((acc, cur) => {
        if (!acc.includes(cur)) {
            acc.push(cur);
        }
        return acc;
    }, []); // []作为回调函数的第一个参数的初始值
}


