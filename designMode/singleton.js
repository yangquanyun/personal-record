/**
 * 单例模式
 * 概念：保证一个类仅有一个实例，并提供访问此实例的全局访问点
 * 适用场景：当点击登录按钮时，会弹出一个登录框，无论你点击多少次这个登录按钮，登录框都只会出现一个，不会出现多个。同时不会频繁的进行删除和添加
 * 而是同一个登录框进行隐藏和显示，因为删除和添加十分耗费性能，所以单例可以达到最大化的效能利用。登录框这个例子就是单例模式最典型的应用
 *
 * 简单的单例模式：无非就是用一个变量指示要创建的实例是否已经创建过了，如果已经创建过了，则在下一次使用实例时，直接返回复用，如果没有创建过，则创建并保存到变量中
 */
const Singleton = function () {}
Singleton.getInstance = (function () {
    // ES6没有静态类型，利用闭包，函数外部无法访问instance
    let instance = null;
    return function () {
        if (!instance) {
            instance = new Singleton();
        }
        // 如果已经存在则直接返回
        return instance;
    }
})();
let s1 = Singleton.getInstance();
let s2 = Singleton.getInstance();
console.log(s1 === s2);
