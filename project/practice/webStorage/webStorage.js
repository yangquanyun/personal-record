/**
 * https://juejin.cn/post/6984908770149138446#heading-2
 * https://juejin.cn/post/6844904128557105166#heading-5
 * 当存入Object类型时，存入的数据会变成其类型的字符串，因为WebStorage的存储只能以字符串的形式存在，如果要存储引用类型的数据，就需要依赖JSON序列化的能力
 * 但是也有一些JSON.stringify不友好的类型数据，尽量不要去存储，如undefined、Function、Symbol等
 */
/**
 * 判断当前类型是否是Symbol
 * @param val 需要判断的值
 * @return {boolean} 当前参数是否是symbol
 */
const isSymbol = val => typeof val === 'symbol';

/**
 * 判断当前值是否能够被JSON。stringify识别
 * @param data 需要判断的值
 * @return {boolean} 当前参数是否可以string化
 */
function hasStringify(data) {
    if (data === undefined) {
        return false;
    }

    if (data instanceof Function) {
        return false;
    }

    if (isSymbol(data)) {
        return false;
    }

    return true;
}

/**
 * 抛出错误
 * @param errMsg  错误信息
 */
function throwErrorMessage (errMsg) {
    throw new Error(errMsg);
}

/**
 * 获取最新的容量数据
 */
// TODO
function initCacheSize () {
    navigator.storage.estimate().then(estimate => {
        this.usage = estimate.usage;
        this.quota = estimate.quota;
    });
}

class CustomStorage {
    constructor() {
        if (navigator && navigator.storage) {
            navigator.storage.estimate().then(estimate => {
                this.usage = estimate.usage;
                this.quota = estimate.quota;
            });
        }
        if (window && window.localStorage && window.sessionStorage) {
            this.readStorage = window.localStorage;

        } else {
            throwErrorMessage('当前环境非浏览器，无法消费全局window实例')
        }
    }

    /**
     * 获取所有key
     * @return {string[]} storage中所有key的集合
     */
    getKeys() {
        return Object.keys(this.readStorage);
    }

    /**
     * 获取所有value
     * @return {any[]}
     */
    getValues() {
        return Object.values(this.readStorage);
    }

    /**
     * 初始化Storage的数据
     * @param config
     */
    bootStrap(config) {
        switch (config.mode) {
            case 'session':
                this.readStorage = window.sessionStorage;
                break;
            case 'local':
                this.readStorage = window.localStorage;
                break;
            default:
                throwErrorMessage('当前配置的mode未在配置区内，请检查传入配置');
                break;
        }
        this.config = config;
    }

    /**
     * 返回当前存储库大小
     * @return {number}
     */
    size () {
        return this.readStorage.length;
    }

    hasItem(key) {
        return this.readStorage.hasOwnProperty(key);
    }

    /**
     * 存储数据
     * @param key 设置当前存储key
     * @param value 设置当前存储value
     */
    setItem(key, value) {
        if (hasStringify(value)) {
            const saveData = {
                timestamp: new Date().getTime(),
                data: value
            };
            console.log(saveData, 'saveData');
            this.readStorage.setItem(key, JSON.stringify(saveData));
        } else {
            throwErrorMessage('需要存储的data不支持JSON.stringify方法，请检查当前数据');
        }
    }

    /**
     * 获取数据
     * @param key 获取当前数据key
     * @return {null|*}
     */
    getItem(key) {
        const content = JSON.parse(this.readStorage.getItem(key));
        if (content?.timestamp && new Date().getTime() - content.timestamp >= this.config.timeout) {
            this.removeItem(key);
            return null;
        }
        return content?.data || null;
    }

    /**
     * 移除一跳数据
     * @param key 移除key
     */
    removeItem(key) {
        if(this.hasItem(key)) {
            this.readStorage.removeItem(key);
        }
    }

    changeItem(key, onChange, baseValue) {
        const data = this.getItem(key);
        this.setItem(key, onChange(data || baseValue));
    }

    clearAll () {
        this.readStorage.clear();
    }

    /**
     * 缓存溢出清理
     * 如果是在内存濒临溢出的场景下，我们就需要释放一些空间来处理后面的数据修改。
     * 首先对带有时间的数据进行汇总排序
     */
    getClearStorage () {
        const keys = Object.keys(this.readStorage);
        const db = [];
        keys.forEach(name =>{
            const item = this.getItem(name);
            if (item.timestamp) {
                db.push({
                    key: name,
                    data: item,
                })
            }
        })
        return db.sort((a, b) => {
            return a.data.timestamp - b.data.timestamp;
        })
    }

    /**
     * 容量清理，直到满足存储大小为止
     * @param currentSize
     */
    detectionStorageContext (currentSize) {
        if (this.usage + currentSize >= this.quota) {
            const storage = this.getClearStorage();
            for (let {key, data} of storage) {
                // 如果满足要求就跳出，还不够就继续清除
                if (this.usage + currentSize < this.quota) break
                // 刷新容量大小
                this.removeItem(key);
                // TODO
                initCacheSize();
            }
        }
    }
}

export default CustomStorage;

