/**
 * 概念：n秒后在执行该事件，若在n秒内被重复触发，则重新计时（延时执行，如果在延时的时间内多次触发，则重新计时）
 * 过程：当事件A发生时，设置一个定时器，a秒后触发A的回调函数，如果在a秒内有新的同一事件发生，则清楚定时器，并重新开始计时
 * 又在a秒后触发A的回调，注意：上次的A的回调并未触发，而是定时器被清除了，定时器中A的回调就不会被执行
 */
/**
 * 防抖函数
 * @param fn 需要延迟执行的函数
 * @param wait 延迟事件
 * @param immediate 是否立即执行
 */
function $debounce(fn, wait, immediate){
    let timeout;
    return function (...rest) {
        let context = this;
        let args = rest;

        if (timeout) clearTimeout(timeout); // timeout不为null

        if (immediate) {
            let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) {
                fn.apply(context, args)
            }
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args)
            })
        }
    }
}
