/**
 * 字符串压缩算法
 * 题目内容：给定由普通英文字母组成的非空字符串s1，要求将连续出现的字符压缩成字符和该字符连续出现的次数，并返回新的字符串s2。s1字符串的长度不超过100。
 * 输入描述:全部由普通英文字符组成的长度不超过100的字符串 。
 * 输出描述: 由英文字符和数字组成的字符串，其中数字表示它前面的字符在输入字符串中连续出现的次数。
 */
/**
 * 解法一： 使用正则表达式匹配相同的项并以数组的形式输出
 * @param str
 * @returns {string}
 */
const stringCount = str => {
    let result =  str.match(/(\w)\1*/g).reduce((a, b) => {
        return b.length === 1 ? [...a, b] : [...a, b[0] + b.length]
    }, [])
    return result.join('');
}

/**
 * 解法二
 * @param sourceStr
 * @returns {string}
 */
const compressString = sourceStr => {
    let count=1;
    let resultStr = '';
    for(let i = 1; i < sourceStr.length + 1; i++){
        if(sourceStr[i-1] === sourceStr[i]){
            count++
        } else {
            resultStr += sourceStr.slice(i-1, i) + (count === 1 ? '' : count)
            count = 1
        }
    }
    return resultStr
};
