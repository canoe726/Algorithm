function MinHeap() {
  let heap = [];

  this.push = function push(value) {
    heap.push(value);
    current = heap.length - 1;

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

  this.pop = function pop() {
    if (heap.length === 0) {
      return null;
    }
    if (heap.length === 1) {
      return heap.pop();
    }

    popData = heap[0];
    heap[0] = heap.pop();
    current = 0;
    child = 1;

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

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length <= 1) {
    return nums.length;
  }

  const heap = new MinHeap();
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    heap.push(nums[i]);
  }

  let answer = 0;
  let prev = null;
  let current = -1;
  let acc = 0;

  for (let i = 0; i < nums.length; i++) {
    current = heap.pop();

    if (map.has(current)) {
      continue;
    } else {
      if (prev === null || current - prev === 1) {
        acc += 1;
      } else {
        answer = Math.max(answer, acc);
        acc = 1;
      }
      map.set(current, true);
    }

    prev = current;
  }
  answer = Math.max(answer, acc);

  return answer;
};

console.log(longestConsecutive([0]));

// [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
