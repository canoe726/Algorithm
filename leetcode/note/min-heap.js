function MinHeap() {
  let heap = [];

  this.push = (value) => {
    heap.push(value);
    let current = heap.length - 1;

    while (current > 0) {
      let parent = Math.floor((current - 1) / 2);

      if (heap[parent] > heap[current]) {
        let temp = heap[parent];
        heap[parent] = heap[current];
        heap[current] = temp;

        current = parent;
      } else {
        break;
      }
    }
  };

  this.pop = () => {
    if (heap.length === 0) {
      return null;
    }
    if (heap.length === 1) {
      return heap.pop();
    }

    let popData = heap[0];
    heap[0] = heap.pop();
    let current = 0;
    let child = 1;

    while (current < heap.length) {
      let sibling = child + 1;

      if (sibling < heap.length && heap[child] > heap[sibling]) {
        child = sibling;
      }
      if (heap[current] > heap[child]) {
        let temp = heap[current];
        heap[current] = heap[child];
        heap[child] = temp;

        current = child;
        child = current * 2 + 1;
      } else {
        break;
      }
    }

    return popData;
  };
}
