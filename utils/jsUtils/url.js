/**
 * 解析 URL 查询参数为对象
 * @param url
 */
export function parseURLToObj(url){
    let args = {}
    let index = url.indexOf('?');
    if (index === -1) return;
    let strParam = url.slice(index + 1);
    strParam.split('&').forEach(param => {
        // 处理有value的参数
        if (/=/.test(param)) {
            let [key, val] = param.split('='); // 分隔key和value
            val = decodeURIComponent(val); // 解码
            if (args.hasOwnProperty(key)) {
                args[key] = [].concat(args[key], val);
            } else {
                args[key] = val;
            }
        } else {
            args[param] = true
        }
    });
    return args;
}
