/**
 * 快速排序
 * 快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序
 * @param elements
 */
function quickSort(elements) {
    if(elements.length <= 1) {
        return elements;
    }

    const pivotIndex = Math.floor(elements.length / 2);
    const pivot = elements.splice(pivotIndex, 1)[0];
    const left = [];
    const right = [];

    for (let i = 0; i < elements.length; i++) {
        if (elements[i] < pivot) {
            left.push(elements[i]);
        } else {
            right.push(elements[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}

const elements = [5, 6, 2, 1, 3, 8, 7, 1.2, 5.5, 4.5];
console.log(quickSort(elements));