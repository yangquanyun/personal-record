/**
 * 二分查找是一种在每次比较之后将查找空间一分为二的算法。每次需要查找集合中的索引或元素时，都应该考虑二分查找。如果集合是无序的，
 * 我们可以总是在应用二分查找之前先对其进行排序
 *
 * 二分查找一般由三个主要部分组成：
 *  1. 预处理——如果集合未排序，则进行排序；
 *  2.二分查找——使用循环或递归在每次比较后将查找空间划分为两半；
 *  3.后处理——在剩余空间中确定可行的候选者；
 */

/**
 * 二分查找
 * @param nums
 * @param target
 */
const search = (nums, target) => {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2); // 防止除不尽的情况
        if (nums[mid] === target) {
            return mid;
        } else if (target < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

// console.log(search([-1,0,3,5,9,12], 9))
