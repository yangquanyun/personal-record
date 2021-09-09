/**
 * 计算图片在一个固定宽高的容器中等比缩放后的宽高
 * 图片必须在加载完成后才能拿到实际的宽高，但是这一操作时异步的，所以统一返回一个Promise对象，最终通过Promise.all方法统一解析
 * @param imgSrc 图片地址
 * @param maxWidth 容器宽度
 * @param maxHeight 容器高度
 * @returns {Promise<>}
 */
export function computeImageInfo (imgSrc, maxWidth, maxHeight) {
    let imageInfo = {
        width: 0,
        height: 0,
    };
    return new Promise((resolve, reject) => {
        let image = new Image();
        // 原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
        image.src = imgSrc;
        image.onload = function () {
            // 当图片比图片框小时不做任何改变
            if (image.width < maxWidth && image.height < maxHeight) {
                imageInfo.width = image.width;
                imageInfo.height = image.height;
            } else { // 原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
                if (maxWidth / maxHeight <= image.width / image.height) { // 原图片宽高比例 大于 图片框宽高比例
                    imageInfo.width = maxWidth; // 以框的宽度为标准
                    imageInfo.height = maxWidth * (image.height / image.width);
                } else { // 原图片宽高比例 小于 图片框宽高比例
                    imageInfo.width = maxHeight * (image.width / image.height);
                    imageInfo.height = maxHeight; // 以框的高度为标准
                }
            }
            resolve(imageInfo);
        };
    });
}

/**
 * 安全取值
 * 取student.userInfo.name
 * safeGet('userInfo.name',student);
 * safeGet(['userInfo','name'],student);
 * 没有值返回undefined
 */
export function safeGet (s, o) {
    let p = [];
    if (Array.isArray(s)) {
        p = s;
    } else {
        p = s.split('.');
    }
    if (Array.isArray(p)) {
        return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : undefined, o);
    } else {
        return undefined;
    }
}

/**
 * 并发请求数量限制
 * @param arr 包含发起请求的promise对象的数组
 * @param count 同时请求的数量
 * @returns {Function} 传入false时中断后续请求
 */

export function $concurrent (arr, count = 4) {
    /* 并发发起四个请求，其中任一请求结束后，发起新的请求，保持并发请求数量不超过四个 */
    return new Promise((resolve, reject) => {
        let g = generator();
        let keep = true;
        let result = [];
        for (let i = 0; i < count; i++) {
            nextCall();
        }

        function nextCall () {
            let { value, done } = g.next();
            done || value.then((data) => {
                if (data === 'reject') {
                    resolve(result);
                    return;
                }
                result.push(data);
                if (result.length === arr.length) {
                    keep = false;
                    resolve(result);
                }
                keep && nextCall();
            }).catch(() => {
                keep = false;
                reject(new Error());
            });
        }

        function * generator () {
            if (arr.length === 0) {
                yield Promise.resolve('reject');
            }
            for (let fn of arr) {
                try {
                    yield fn();
                } catch (e) {
                    return e;
                }
            }
        }
    });
}

/**
 * 随机生成id
 * @param n 默认32位
 * @returns {string}
 */
export function $randomId (n = 32) {
    let s = '';
    Array.from({ length: n }).forEach((v, i) => {
        let r = Math.floor(Math.random() * 36);
        if (r < 10) {
            s += r;
        } else {
            s += String.fromCharCode(r + 87);
        }
        if ([7, 11, 15, 19].includes(i)) s += '-';
    });
    return s;
}

/**
 * 查找子类元素
 * @param param
 * @returns {*}
 * @constructor
 */
export function $find (el, cls) {
    if (!el) return [];
    let res = [];
    if (el.length) {
        Array.from(el).forEach(e => {
            res.push(...$find(e, cls));
        });
    } else {
        if (Array.from(el.classList).includes(cls)) {
            res.push(el);
        }
        if (el.children && el.children.length) {
            res.push(...$find(el.children, cls));
        }
    }
    return res;
}

/**
 * 查找最近的父级元素
 * @param param
 * @returns {*}
 * @constructor
 */
export function $closest (el, selector) {
    let name = el.localName;
    if (name === selector) {
        return el;
    } else if (name !== 'html') {
        return $closest(el.parentNode, selector);
    }
    return null;
}
