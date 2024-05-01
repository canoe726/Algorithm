class Node {
  data = null;
  next = null;

  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class MyQueue {
  front = null;
  rear = null;

  isEmpty() {
    return this.front === null;
  }

  enqueue(data) {
    const newNode = new Node(data, null);

    if (this.front === null) {
      this.front = this.rear = newNode;
      return;
    }

    if (this.front === this.rear) {
      this.rear = newNode;
      this.front.next = this.rear;
      return;
    }

    this.rear.next = newNode;
    this.rear = this.rear.next;
  }

  dequeue() {
    if (this.isEmpty()) {
      return;
    }

    const popNode = this.front;

    if (this.front === this.rear) {
      this.front = this.rear = null;
      return popNode.data;
    }

    this.front = this.front.next;
    return popNode.data;
  }
}

var jump = function (nums) {
  let min = Number(1e9);
  let visited = new Array(nums.length).fill(false);
  visited[0] = true;
  const queue = new MyQueue();
  queue.enqueue([0, 0]);

  while (!queue.isEmpty()) {
    const [idx, val] = queue.dequeue();

    if (idx === nums.length - 1) {
      min = Math.min(min, val);
    }

    for (let i = idx + 1; i <= idx + nums[idx]; i++) {
      if (!visited[i]) {
        queue.enqueue([i, val + 1]);
        visited[i] = true;
      }
    }
  }

  return min;
};
