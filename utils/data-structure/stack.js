class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this._top = null;
    }
    
    push(value) {
        const node = new Node(value);
        if (this._top == null) {
            this._top = node;
        } else {
            const prevTop = this._top;
            this._top = node;
            this._top.next = prevTop;
        }
    }
    
    pop() {
        if (this.empty()) {
            return null;
        } else {
            this._top = this._top.next;
        }
    }
        
    top() {
        if (this.empty()) { 
            return this._top;
        } else {
            return this._top.value;
        }
    }
    
    empty() {
        return (this._top == null);
    }
}

// const stack = new Stack()
// stack.push(2);
// stack.pop();
// stack.empty();
// stack.top();
