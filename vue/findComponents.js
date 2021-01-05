/**
 * findComponents系列方法，需要自行实现，以工具函数的形式来使用，它是一系列的函数，可以说是组件通信的终极方案。
 * findComponents系列方法最终都是返回组件的实例，进而可以读取或调用该组件的数据和方法
 * 都是通过递归、遍历，找到指定组件的name选项匹配的组件实例并返回
 */

/**
 * 向上查找组件
 * @param context 当前组件上下文对象
 * @param componentName 组件名
 */
const findUpwardComponent = (context, componentName) => {
    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || !name.includes(componentName))) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

/**
 * 向下查找组件
 * @param context 当前组件上下文对象
 * @param componentName 组件名
 */
const findDownwardComponent = (context, componentName) => {
    const $children = context.$children;
    let bean = null;
    if ($children.length) {
        for (const child of $children) {
            const name = child.$options.name;
            if (name && name.includes(componentName)) {
                bean = child;
                break;
            } else {
                bean = findDownwardComponent(child, componentName);
                if (bean) break
            }
        }
    }
    return bean;
}

/**
 * 查找兄弟组件
 * @param context 当前组件上下文对象
 * @param componentName 组件名
 * @param exceptMe 是否排除当前组件
 */
const findBrotherComponents = (context, componentName, exceptMe = true) => {
    const $brothers = context.$parent.$children.filter(item => {
        return item.$options.name && item.$options.name.includes(componentName);
    });
    const index = $brothers.findIndex(item => item._uid === context._uid);
    if (exceptMe && index > -1) $brothers.splice(index, 1);
    return $brothers;
}

export {findUpwardComponent, findDownwardComponent, findBrotherComponents}
