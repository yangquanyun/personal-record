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
