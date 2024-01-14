class MaxHeap {
  constructor () {
    this.heap = [-1];
  }

  empty () {
    return this.heap.length == 1;
  }

  size () {
    return this.heap.length - 1;
  }

  push (elem) {
    this.heap.push(elem);
    let child = this.size();
    let parent = Math.floor(child / 2);
    while (parent > 0) {
      if (this.heap[child] > this.heap[parent]) {
        [this.heap[child], this.heap[parent]] = [this.heap[parent], this.heap[child]];
        child = parent;
        parent = Math.floor(child / 2);
      } else {
        break;
      }
    }
  }

  pop () {
    const maxValue = this.heap[1];
    let temp = this.heap[1];
    this.heap[1] = this.heap[this.size()];
    this.heap[this.size()] = temp;
    this.heap.splice(this.size(), 1);

    let parent = 1;
    while (true) {
      let leftChild = parent * 2;
      let rightChild = (parent * 2) + 1;
      let child = -1;
      if (leftChild <= this.size() && rightChild <= this.size()) {
        child = this.heap[leftChild] < this.heap[rightChild] ? rightChild : leftChild;
      } else if (leftChild <= this.size()) {
        child = leftChild
      } else if (rightChild <= this.size()) {
        child = rightChild;
      } else {
        break;
      }

      if (this.heap[parent] < this.heap[child]) {
        [this.heap[parent], this.heap[child]] = [this.heap[child], this.heap[parent]];
        parent = child;
      } else {
        break;
      }
    }
    return maxValue;
  }

  print () {
    const printHeap = this.heap.slice();
    printHeap.splice(0, 1);
    console.log(printHeap);
  }
}

module.exports = MaxHeap;

// const data = [6, 3, 10, 5, 11, 2, 3, 9, 1, 4, 7, 2, 8]
// const maxHeap = new MaxHeap();
// for (let i = 0; i < data.length; i++) {
//   maxHeap.push(data[i]);
// }

// while (!maxHeap.empty()) {
//   console.log(maxHeap.pop());
// }
