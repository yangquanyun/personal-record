/**
 * broadcast与dispatch实现了一个定向的多层级父子组件间的事件广播及事件派发功能。完成多层级分发对应事件的组件通信功能。
 * broadcast通过递归遍历子组件找到所需组件广播事件
 * dispatch则逐级向上查找对应父组件派发事件
 */

function _broadcast(componentName, eventName, params) {
    // 遍历当前节点下的所有子组件
    this.$children.forEach(child => {
        // 获取子组件名称
        const name = child.$options.componentName;

        if (name === componentName) {
            // 如果是我们需要广播到子组件的时候调用$emit触发所需事件，在子组件中用$on监听
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            // 非所需子组件则递归遍历深层次子组件
            _broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    })
}

export default {
    methods: {
        /**
         * 对多级父组件进行事件派发，根据componentName向上级一直寻找对应父组件，找到以后emit事件
         * @param componentName 组件名
         * @param eventName 事件名称
         * @param params 参数
         */
        dispatch(componentName, eventName, params) {
            //获取父组件，如果已经是根组件，则是$root
            let parent = this.$parent || this.$root;

            // 获取父节点的组件名
            let name = parent.$options.componentName;

            // 当父组件不是所需组件时继续向上寻找
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.componentName;
                }
            }

            // 找到所需组件后调用$emit触发当前事件
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },

        /**
         * 向所有子组件进行事件广播，这里包了一层，为了修改_broadcast的this对象为当前Vue实例
         * 根据componentName深度遍历子组件找到对应组件emit事件
         * @param componentName 组件名
         * @param eventName 事件名称
         * @param params 参数
         */
        broadcast(componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        }
    }
}
