/**
 * https://mp.weixin.qq.com/s/XQVicutCKzVsuNW9jkhUrA
 * 请用算法实现，从给定的无需、不重复的数组A中，取出N个 数，使其相加和为M。并给出算法的时间和空间复杂度：如
 * var arr = [1, 4, 7, 11, 9, 8, 10, 6];
 * var N = 3;
 * var M = 27;
 * Result:
 * [7, 11, 9], [11, 10, 6], [9, 8, 10]
 *
 * 解题思路：
 *  根据数组长度构建二进制数据，再选择其中满足条件的数据。
 *  我们用1和0来表示数组中某位元素是否呗选中。因此，可以用0110来表示数组中的第一位和第二位被选中了
 *
 *  所以，本体可以解读为：
 *      a.数组中被选中的个数是N
 *      b.被选中的和是M
 *  遍历所有二进制，判断选中个数是否为N，然后再求对应的元素之和，看其是否为M
 */