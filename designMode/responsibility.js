/**
 * 设计模式——责任链模式
 * 概念：多个对象均有机会处理请求，从而解除发送者和接收者之间的耦合关系。这些对象连接成为链式结构，每个节点转发请求，直到有对象处理请求为止
 * 核心：请求者不必知道是哪个节点对象处理的请求。如果当前不符合终止条件，那么把请求转发给下一个节点处理。
 * 当需求具有“传递”的性质时（代码中其中一种体现就是：多个if、else if、else嵌套），就可以考虑将每个分支拆分为一个节点对象，拼接成为责任链
 *
 * 优缺点：
 *  优点:
 *      1.可以根据需求变动，任意向责任链中添加/删除节点对象
 *      2.没有固定的”开始节点“，可以从任意节点开始
 *  缺点：责任链最大的代价就是每个节点带来的多余消耗。当责任链过长，很多节点只有传递的作用，而不是真正地处理逻辑
 *
 *  下面的代码模拟是实现，日志打印场景，其中包含了普通日志、警告日志、错误日志
 */
class Handler {
    constructor() {
        this.next = null;
    }

    setNext (handler) {
        this.next = handler;
    }
}

class LogHandler extends Handler {
    constructor(...props) {
        super(...props);
        this.name = 'log';
    }

    handler (level, msg) {
        if (level === this.name) {
            console.log(`LOG：${msg}`)
            return false;
        }
        this.next && this.next.handler(...arguments);
    }
}

class WarnHandler extends Handler {
    constructor(...props) {
        super(...props);
        this.name = 'warn';
    }

    handler (level, msg) {
        if (level === this.name) {
            console.log(`WARM：${msg}`);
            return false;
        }
        this.next && this.next.handler(...arguments);
    }
}

class ErrorHandler extends Handler {
    constructor(...props) {
        super(...props);
        this.name = 'error';
    }

    handler(level, msg) {
        if (level === this.name) {
            console.log(`ERROR：${msg}`);
            return false;
        }
        this.next && this.next.handler(...arguments);
    }
}

// 测试代码
let logHandler = new LogHandler();
let warnHandler = new WarnHandler();
let errorHandler = new ErrorHandler();

// 设置下一个处理的节点
logHandler.setNext(warnHandler);
warnHandler.setNext(errorHandler);

logHandler.handler('error', 'Some error occur');
