/**
 * floatCalc 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。　 舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply /divide
 *
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *
 * floatCalc.add(0.1, 0.2) >> 0.3
 * floatCalc.multiply(19.9, 100) >> 1990
 *
 */
export let floatCalc = function () {
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *  {times:100, num: 314}
     */
    function toInteger(floatNum) {
        let ret = {times: 1, num: 0}
        // 判断是不是负数
        let isNegative = floatNum < 0
        if (Number.isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        let strVal  = floatNum + '';
        let dotPos = strVal.indexOf('.');
        let len = strVal.substr(dotPos+1).length; // 获取小数点后的位数
        let times  = Math.pow(10, len); // 计算换算成整数的倍数
        let tempNum = Math.abs(floatNum) * times + 0.5;
        let intNum = parseInt(tempNum.toString(), 10);
        ret.times  = times
        if (isNegative) {
            intNum = -intNum
        }
        ret.num = intNum
        return ret
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, digits, op) {
        let o1 = toInteger(a)
        let o2 = toInteger(b)
        let n1 = o1.num
        let n2 = o2.num
        let t1 = o1.times
        let t2 = o2.times
        let max = t1 > t2 ? t1 : t2
        let result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                result = (n1 / n2) * (t2 / t1)
                return result
        }
    }

    // 加减乘除的四个接口
    function add(a, b, digits) {
        return operation(a, b, digits, 'add')
    }
    function subtract(a, b, digits) {
        return operation(a, b, digits, 'subtract')
    }
    function multiply(a, b, digits) {
        return operation(a, b, digits, 'multiply')
    }
    function divide(a, b, digits) {
        return operation(a, b, digits, 'divide')
    }

    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();
