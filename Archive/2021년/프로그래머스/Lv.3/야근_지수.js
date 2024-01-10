class MaxHeap {
    constructor() {
        this.heap = [-1];
    }
    
    push(n) {
        this.heap.push(n);
        let idx = this.heap.length - 1;
        while (idx > 1) {
            const parent = Math.floor(idx / 2);
            if (this.heap[parent] < this.heap[idx]) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
            }
            idx = parent;
        }
    }
    
    pop() {
        if (!this.empty()) {
            let size = this.heap.length;
            [this.heap[1], this.heap[size - 1]] = [this.heap[size - 1], this.heap[1]];
            const poped = this.heap.pop();

            let idx = 1;
            size = this.heap.length;
            while (idx < size) {
                const leftIdx = idx * 2;
                const rightIdx = idx * 2 + 1;
                if (leftIdx >= size && rightIdx >= size) {  // 자식이 없음
                    break;
                } else if (leftIdx >= size) {               // 오른쪽 자식만 있음
                    const child = rightIdx;
                    if (this.heap[idx] < this.heap[child]) {
                        [this.heap[idx], this.heap[child]] = [this.heap[child], this.heap[idx]];
                    }
                    idx = child;
                } else if (rightIdx >= size) {               // 왼쪽 자식만 있음
                    const child = leftIdx;
                    if (this.heap[idx] < this.heap[child]) {
                        [this.heap[idx], this.heap[child]] = [this.heap[child], this.heap[idx]];
                    }
                    idx = child;
                } else {                                     // 왼쪽, 오른쪽 자식 둘 다 있음
                    const child = this.heap[leftIdx] > this.heap[rightIdx] ? leftIdx : rightIdx;
                    if (this.heap[idx] < this.heap[child]) {
                        [this.heap[idx], this.heap[child]] = [this.heap[child], this.heap[idx]];
                    }
                    idx = child;         
                }
            }
            return poped;
        } else {
            return -1;
        }
    }
    
    empty() {
        return this.heap.length == 1;
    }

    top() {
        return this.heap[1];
    }
}

function solution(n, works) {
    let answer = 0;
    let heap = new MaxHeap();
    
    works.map(work => {
        heap.push(work);
    });
    
    for (let i = 0; i < n; i++) {
        let maxVal = heap.pop();
        if (maxVal - 1 > 0) {
            heap.push(maxVal - 1);
        }
    }

    for (let i = 1; i < heap.heap.length; i++) {
        answer += (heap.heap[i] * heap.heap[i]);
    }
    
    return answer;
}
