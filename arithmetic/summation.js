/**
 * 什么是两数之和，给定一个整数数组nums和一个目标值target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标
 * 例如：
 *  给定 nums = [2, 7, 11, 15],target = 9
 *  因为nums[0] + nums[1] = 2 + 7 = 9
 *  所以返回[0, 1]
 *
 *  傻瓜式解法就是上层遍历，但时间复杂度太高，期望能够一次遍历就能解决，此时我们使用一个map来记录遍历过的元素
 *
 *  解题思路：
 *      1. 初始化一个map = new Map()
 *      2. 从第一个元素开始遍历nums
 *      3. 获取目标值与num[i]的差值，即k = target - nums[i],判断差值在map中是否存在
 *         a. 不存在(map.has(k)为false)，则将nums[i]加入到map中(key为nums[i],value为i，方便查找map中是否存在某值，并可以通过get方法直接拿到下标)
 *         b. 存在(map.has(k))，返回[map.get(k)，i]，求解结束
 *      4. 遍历结束，则nums中没有符合条件的两个数，返回[]
 *  时间复杂度: O(n)
 */
const twoSum = (nums, target) => {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let k = target - nums[i];
        if (map.has(k)) {
            return [map.get(k), i];
        }
        map.set(nums[i], i)
    }
    return [];
}
