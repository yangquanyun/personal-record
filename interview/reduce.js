/**
 * reduce介绍
 *  reduce()方法对数组中的每个元素执行一个由您提供的reducer函数（升序执行），将其结果汇总为单个返回值。其能做的功能很多，通过回调函数实现
 *  reduce的第一个参数是回调函数，其中有四个参数（累加器，当前值，当前索引，原数组），后两个参数可选
 *  第二个参数是回调函数的第一个参数累加器的初始值（很重要）
 *  注意：不给初始值，那么初始值就是原数组的第一个元素，计算从第二个元素开始。给了初始值就是从第一个元素开始
 *
 *  https://juejin.cn/post/6942435294549377054?utm_source=gold_browser_extension#heading-8
 */

// 为存储数值的数值进行累加求和
// acc为累加器（初始值为数组的第一个元素），cur为当前元素
let result = [1,2,3,4].reduce((acc, cur) => {
    return acc + cur;
})
console.log(result);

// 按属性对Object进行分类
const bills = [
    {
        type: 'transfer',
        money: 233
    },
    {
        type: 'study',
        money: 341
    },
    {
        type: 'shop',
        money: 821
    },
    {
        type: 'transfer',
        money: 821
    },
    {
        type: 'study',
        money: 821
    },
]
let data = bills.reduce((acc, cur) => {
    // 遇到不存在的类型，就新建一个空数组来装
    if (!acc[cur.type]) {
        acc[cur.type] = []; // 二维数组
    }
    acc[cur.type].push(cur);
    return acc;
}, []);
console.log(data)


/**
 * reduce相关面试题
 * 题目描述：请使用原生JS实现一个方法，判断html中出现次数最多的标签，并统计这个次数
 * 知识点细化：
 *  1.获取所有标签——document.querySelector(*)：列出页面内所有标签
 *  2.Object.entries()
 *    返回一个数组，其元素是与直接在object上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同
 *    简单来说就是可以把对象的每个属性变成一个数组，这个数组里有两个值，一个为属性名，一个为属性值。
 * 思路分析：
 *  1.先获得含有所有标签的NodeList数组，然后将其加工为只有标签名的数组，接着使用reduce得到一个对象，以标签名为属性名，标签数量为属性值的对象
 *  2. 将上一步得到的对象用Object.entries()变为一个二维数组，再用reduce对齐处理，得到数量最多的那个标签（比较每个数组的tags[1]，返回数组的tags[0]）
 */

window.onload = function () {
    // 最大数的思路是JS必考的，使用reduce
    const maxBy = function (list, tag) {
        return list.reduce((x, y) => {
            // 根据reduce方法获得数量最大的那个标签
            return tag[x] > tag[y] ? x : y;
        })
    }

    function getFrequentTag() {
        //得到reduce需要的数组
        const tags = [...document.querySelector('*')].map( x => x.tagName).reduce((acc, tag) => {
            acc[tag] = acc[tag] ? acc[tag] + 1 : 1;
            // 数组存在该元素，就值+1，否则创建元素，设置值为1
            return acc; // 得到以tag名为属性名，数量为属性值的对象
        }, {});
        return maxBy(Object.entries(tags), tag => tags[1]);
        // tag=>tag[1] 这个函数表示return 数组的第二个值，也就是标签的数量
    }

    console.log(getFrequentTag())
}

