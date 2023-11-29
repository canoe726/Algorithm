function MinHeap () {
  let heap = [-1];

  function size () {
    return heap.length - 1;
  }

  function top () {
    return heap[1];
  }

  function empty () {
    return heap.length == 1;
  }

  function push (value) {
    heap.push(value);

    let child = size();
    let parent = Math.floor(child / 2);
    while (parent > 0) {
      if (heap[parent] > heap[child]) {
        let temp = heap[parent];
        heap[parent] = heap[child];
        heap[child] = temp;

        child = parent;
        parent = Math.floor(child / 2)
      } else {
        break;
      }
    }
  }

  function pop () {
    if (empty()) {
      return null;
    }
    const minValue = top();
    let temp = heap[1];
    heap[1] = heap[size()];
    heap[size()] = temp;
    heap.pop();

    let root = 1;
    while (true) {
      let left = root * 2;
      let right = (root * 2) + 1;
      let nextChild;
      if (left <= size() && right > size()) {
        nextChild = left;
      } else if (left > size() && right <= size()) {
        nextChild = right;
      } else if (left <= size() && right <= size()) {
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

  function print () {
    let printStr = '[';
    for (let i = 1; i <= size(); i++) {
      if (i == size()) {
        printStr += `${heap[i]}]`
      } else {
        printStr += `${heap[i]}, `
      }
    }
    console.log(printStr);
  }

  return { size, empty, push, pop, print };
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
