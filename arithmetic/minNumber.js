/**
 * 题目内容： 实现一个function，两个参数 number，key。实现如下效果：如：12456，2 返回126；去掉number中key个元素，使得剩下的数字最小
 * 思路：如果是个12345678这种依次递增的，那就从尾巴依次删除就好了;
 *      乱序的数字，其实就是每次去看，依次对比，如果前一个比后一个大，删了就好了
 *      例如213413832，删5个。这很明显是个乱序的嘛，所以：
 *      进入删第一个的循环，比较2和1，2比1大，删掉2；结果13413832
 *      进入删第二个的循环，比较1和3，1比3小，继续比较3和4，3比4小，继续比较4和1，4比1大，删掉4；结果1313832；
 *      进入删第三个的循环，比较1和3，1比3小，继续比较3和1，3比1大，删掉3；结果113832；
 *      进入删第四个的循环，比较1和1，相等，继续比较1和3，1比3小，继续比较3和8，3比8小，继续比较8和3，8比3大，删掉8；结果11332；
 *      以此类推
 *
 */

function getMinNumber(number, key) {
    if (typeof number !== 'number' || typeof key !== 'number' || !Number.isInteger(number) || number < 0 || !Number.isInteger(key) || key < 1) {
        return false;
    }
    let tempArr = number.toString().split('');
    let needRemoveNumber = key;
    let label = false;
    while (needRemoveNumber) {
        label = false;
        for (let i = 0; i < tempArr.length - 1; i++) {
            if (tempArr[i] > tempArr[i + 1]) {
                tempArr.splice(i, 1);
                needRemoveNumber--;
                label = true;
                break;
            }
        }
        if (!label) {
            return Number(tempArr.slice(0, tempArr.length - needRemoveNumber).join(''));
        }
    }
    return Number(tempArr.join(''));
}
