/**
 * 一劳永逸的组件注册
 * 通常在组件使用前，需要引入后再注册，但如果高频组件多了，每次都来这样做，不仅新增很多代码，效率还低！那应该如何优化呢?
 * 其实，我们可以借助一下webpack的require.context()方法来创建自己的（模块）上下文，从而实现自动动态require组件
 * 我们先在components文件夹（这里面都是些高频组件）添加一个叫global.js的文件，在这个文件里使用require.context动态将需要的高频组件统统打包进来，然后在main.js文件中引入global.js的文件
 */
import Vue from 'vue';
function changeStr (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireComponent = require.context('./', false, /\.vue$/)

// 查找同级目录下以vue结尾的组件
const install = () => {
    requireComponent.keys().forEach(fileName => {
        let config = requireComponent(fileName);

        let componentName = changeStr(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
        )
        Vue.component(componentName, config.default || config);
    })
}

// 对外暴露Install 方法
export default {
    install
}
