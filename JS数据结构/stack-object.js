class Stack {
    constructor() {
        this.count = 0;
        this.items = {}
    }

    push(element) {
        this.items[this.count] = element;
        this.count++;
    }

    size () {
        return this.count;
    }

    isEmpty () {
        return this.count === 0
    }

    pop () {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--;
        console.log(this.count, '/size')
        console.log(this.items)
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
}

const stack = new Stack();
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)

stack.pop();