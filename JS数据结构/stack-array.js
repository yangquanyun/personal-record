class Stack {
    constructor() {
        this.items = [];
    }

    push (element) {
        this.items.push(element)
    }

    pop () {
        this.items.pop()
    }

    //查看栈顶元素
    peek () {
        return this.items[this.items.length - 1]
    }

    isEmpty () {
        return this.items.length === 0
    }

    size () {
        return this.items.length;
    }

    clear () {
        this.items = []
    }
}

const stack = new Stack();
console.log(stack.isEmpty())
console.log(stack.peek());
