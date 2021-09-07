/**
 * 冒泡排序
 * 1. 比较相邻的两个元素，如果前一个比后一个大，则交换位置
 * 2. 第一轮的时候最后一个元素应该是最大的一个
 * 3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较
 *
 */
function sort(elements) {
    for (let i = 0; i < elements.length - 1; i++) {
        for (let j = 0; j < elements.length - i - 1; j++) {
            if (elements[j] > elements[j + 1]) {
                let swap = elements[j];
                elements[j] = elements[j + 1];
                elements[j + 1] = swap;
            }
        }
    }
}

const elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8];
sort(elements)
console.log(elements);