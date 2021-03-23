// 获取一个随机布尔值(Math.random将在0和1之间创建一个随机数，这意味着得到真或假的几率都是50%)
export const randomBoolean = () => Math.random() >= 0.5;

//反转字符串
export const reverse = str => str.split('').reverse().join('');

// 检查当前Tab页是否在前台
export const isBrowserTabInView = () => document.hidden;

// 检查数字是否为偶数
export const isEven = num => num % 2 === 0;

// 从日期中获取时间 （通过使用toTimeString()，在正确的位置对字符串进行切片）
export const timeFromDate = date => date.toTimeString().slice(0, 8);

// 保留小数点（非四舍五入），将一个数字截断到某个小数位
export const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);

// 检查元素当前是否为聚焦状态
export const elementIsInFocus = (el) => (el === document.activeElement);

// 检查当前用户是否为苹果设备
export const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// 滚动到页面顶部
export const goToTop = () => window.scrollTo(0, 0);

// 获取所有参数的平均值
export const average = (...args) => args.reduce((a, b) => a + b) / args.length;

// 转换华氏度/摄氏度
export const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32;
export const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;
