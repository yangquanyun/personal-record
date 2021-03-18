#vue2与vue3响应式原理分析
>两者都是发布订阅模式。通俗一点就是数据发生变化就要触发依赖，更新数据

+ vue2.0主要是通过类new一个实例来实现的，通过Object.defineProperty()来劫持各个属性的get和set
+ 首先Observer实例化，拿到数据。遍历数据属性，defineProperty劫持每个属性。通过defineProperty的get来获取属性
+ get中除了要获取属性外，还需要做一个添加依赖的动作，为数据更新行为做准备（即dep.addSub(Dep.target)）

```JavaScript
Object.defineProperty(obj, key, {
    enumerable: true,//可枚举性，表示能否通过for-in遍历得到属性。默认值为true。
    configurable: false,//可配置性，控制着其描述的属性的修改，表示能否修改属性的特性，能否把属性修改为访问器属性，或者能否通过delete删除属性从而重新定义属性。默认值为true。
    get() {
        //初始化
        //订阅者数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
    },
    set: (newValue) => {
        this.observer(newValue);
        if (newValue !== value) {
            value = newValue;
        }
        //告诉Dep通知变化
        dep.notify();
    }
})
````

+ Dep收集依赖，使用Dep类实现依赖的收集器。收集依赖后，可以实现数据改变驱动页面更新等操作。内部存在添加依赖、触发依赖两个方法
+ Dep中先创建一个空数组，存放要收集的依赖。addSub添加依赖则是将收集到的watcher放进数组中;notify触发依赖则是通知watcher去更新，而不是自己更新

```JavaScript
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(item => item.update())
    }
}
```
+ Watcher，主要存在两个功能：获取值、更新值。获取值中牵扯到编译，需要从html中匹配绑定的变量。更新值的核心就是将新值赋值给旧值
+ 更新触发defineProperty的set，将新值传给observer，在通知dep去更新。notify中通过调用watcher的update操作，重新设置新值。

```JavaScript
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldVal = this.getOldVal();
    }
    getOldVal() {
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.expr, this.vm);
        Dep.target = null; // compileUtill类主要功能是编译，getVal获取变量值
        return oldVal;
    }
    update() {
        const newVal = compileUtil.getVal(this.expr, this.vm);
        if (newVal !== this.oldVal) {
            this.cb(newVal);
        }
    }
}
```

