function MinHeap() {
  let heap = [-1];

  function size() {
    return heap.length - 1;
  }

  function top() {
    return heap[1];
  }

  function empty() {
    return heap.length == 1;
  }

  function push(value) {
    heap.push(value);

    let childIndex = size();
    let parentIndex = Math.floor(childIndex / 2);

    while (parentIndex > 0) {
      if (heap[parentIndex] > heap[childIndex]) {
        let temp = heap[parentIndex];
        heap[parentIndex] = heap[childIndex];
        heap[childIndex] = temp;

        childIndex = parentIndex;
        parentIndex = Math.floor(childIndex / 2);
      } else {
        break;
      }
    }
  }

  function pop() {
    if (empty()) {
      return null;
    }
    const topIndex = 1;
    const heapSize = size();
    const minValue = top();

    let temp = heap[topIndex];
    heap[topIndex] = heap[heapSize];
    heap[heapSize] = temp;
    heap.pop();

    let root = 1;
    while (true) {
      let left = root * 2;
      let right = root * 2 + 1;
      let child;

      if (left <= heapSize && right > heapSize) {
        child = left;
      } else if (left > heapSize && right <= heapSize) {
        child = right;
      } else if (left <= heapSize && right <= heapSize) {
        child = heap[left] > heap[right] ? right : left;
      } else {
        break;
      }

      if (heap[child] < heap[root]) {
        temp = heap[root];
        heap[root] = heap[child];
        heap[child] = temp;

        root = child;
      } else {
        break;
      }
    }
    return minValue;
  }

  function print() {
    let printStr = '[';
    for (let i = 1; i <= size(); i++) {
      if (i == size()) {
        printStr += `${heap[i]}]`;
      } else {
        printStr += `${heap[i]}, `;
      }
    }
    console.log(printStr);
  }

  return { size, top, empty, push, pop, print };
}

// const minHeap = MinHeap();
// minHeap.push(7);
// minHeap.push(3);
// minHeap.push(5);
// minHeap.push(1);
// minHeap.push(2);
// minHeap.print();
// console.log(minHeap.pop());
// console.log(minHeap.pop());
// console.log(minHeap.pop());
// console.log(minHeap.pop());
// console.log(minHeap.pop());
// console.log(minHeap.pop());

module.exports = MinHeap;
