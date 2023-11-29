class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor(value) {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }
    
    push(value) {
        const node = new Node(value);
        if (this.empty()) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            this._tail = node;
        }
        this._size += 1;
    }
    
    pop() {
        if (this.empty()) {
            return null;
        } else {
            const value = this._head.value;
            this._head = this._head.next;
            this._size -= 1;
            if (this._size == 0) {
                this._head = null;
                this._tail = null;
            }
            return value;
        }
    }
    
    head() {
        return (this._head);
    }
    
    tail() {
        return (this._tail);
    }
    
    empty() {
        return (this._size == 0);
    }
    
    size() {
        return (this._size);
    }
}
