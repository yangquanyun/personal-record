/**
 * 一个webpack的api,通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,
 * 在前端工程中,如果遇到从一个文件夹引入很多模块的情况,
 * 可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块
 * require.context函数接受三个参数
 *  directory {String} -读取文件的路径
 *  useSubdirectories {Boolean} -是否遍历文件的子目录
 *  regExp {RegExp} -匹配文件的正则
 */
// 自动导入components文件夹中的所有vue组件
const context = require.context('./components/', false, /\.vue$/);
let components = {};
context.keys().forEach(key => {
    const component = context(key).default;
    components[component.name] = component;
});
