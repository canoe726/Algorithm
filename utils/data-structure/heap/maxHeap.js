function MaxHeap() {
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

  function push(elem) {
    heap.push(elem);

    let childIndex = size();
    let parentIndex = Math.floor(childIndex / 2);

    while (parentIndex > 0) {
      if (heap[childIndex] > heap[parentIndex]) {
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
    const maxValue = top();

    let temp = heap[topIndex];
    heap[topIndex] = heap[heapSize];
    heap[heapSize] = temp;
    heap.splice(heapSize, 1);

    let root = 1;
    while (true) {
      let left = root * 2;
      let right = root * 2 + 1;
      let child;

      if (left <= heapSize && right <= heapSize) {
        child = heap[left] < heap[right] ? right : left;
      } else if (left <= heapSize) {
        child = left;
      } else if (right <= heapSize) {
        child = right;
      } else {
        break;
      }

      if (heap[root] < heap[child]) {
        temp = heap[root];
        heap[root] = heap[child];
        heap[child] = temp;

        root = child;
      } else {
        break;
      }
    }
    return maxValue;
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

module.exports = MaxHeap;

// const data = [6, 3, 10, 5, 11, 2, 3, 9, 1, 4, 7, 2, 8];
// const maxHeap = new MaxHeap();
// for (let i = 0; i < data.length; i++) {
//   maxHeap.push(data[i]);
// }

// while (!maxHeap.empty()) {
//   console.log(maxHeap.pop());
// }
