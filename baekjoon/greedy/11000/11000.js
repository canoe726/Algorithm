const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

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
      let nextChild;

      if (left <= heapSize && right > heapSize) {
        nextChild = left;
      } else if (left > heapSize && right <= heapSize) {
        nextChild = right;
      } else if (left <= heapSize && right <= heapSize) {
        nextChild = heap[left] > heap[right] ? right : left;
      } else {
        break;
      }

      if (heap[nextChild] < heap[root]) {
        temp = heap[root];
        heap[root] = heap[nextChild];
        heap[nextChild] = temp;

        root = nextChild;
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

function main(n, arr) {
  arr = arr.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  const minHeap = MinHeap();
  minHeap.push(arr[0][1]);

  for (let i = 1; i < n; i++) {
    const lastEnd = minHeap.top();

    const [start, end] = arr[i];
    if (lastEnd <= start) {
      minHeap.pop();
    }
    minHeap.push(end);
  }

  return minHeap.size();
}

const response = main(
  n,
  arr.map((a) => a.split(' ').map((a) => Number(a))),
);
console.log(response);
