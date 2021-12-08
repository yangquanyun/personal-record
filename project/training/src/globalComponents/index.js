import Vue from 'vue'

// 自动注册全局组件
function registerAllComponents(requireContext) {
  return requireContext.keys().forEach(comp => {
    const vueComp = requireContext(comp)
    // default.name 就是我们 .vue 组件导出的 name
    // 这块逻辑需要根据自己的命名习惯去调整
    const compName = vueComp.default.name ? vueComp.default.name : /\/([\w-]+)\.vue$/.exec(comp)[1]
    Vue.component(compName, vueComp.default)
  })
}

// 注册当前目录下的所有 .vue 文件，包括子目录
registerAllComponents(require.context('./', true, /\.vue$/))