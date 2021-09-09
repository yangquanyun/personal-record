/**
 * 节流
 *  概念：n秒内只运行一次，若在n秒内重复触发，只有一次执行
 *  实现方法：完成节流可以使用时间戳与定时器的写法
 */

/**
 * 将时间戳写法的特性与定时器写法的特性相结合，实现一个更加精确的节流
 * @param fn
 * @param delay
 */
function throttle(fn ,delay) {
    let timer = null;
    let startTime = Date.now();
    return function () {
        let curTime = Date.now(); // 当前时间
        let remaining = delay - (curTime - startTime); // 从上一次到现在，还剩下多少多余时间
        let context = this;
        if (remaining < 0) {
            fn.apply(context, arguments);
            startTime = Date.now();
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}

/**
 * 使用时间戳写法，事件会立即执行，停止触发后没有办法再次执行
 * @param fn
 * @param delay
 * @return {function(...[*]=): void}
 */
function throttle1(fn, delay = 500) {
    let oldTime = Date.now();
    return function (...args) {
        let newTime = Date.now();
        if (newTime - oldTime >= delay) {
            fn.apply(null, args);
            oldTime = Date.now();
        }
    }
}

/**
 * 使用定时器写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再一次执行
 * @param fn
 * @param delay
 */
function throttle2(fn, delay = 500) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null
            }, delay);
        }
    }
}
