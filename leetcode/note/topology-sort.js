function Node(data) {
  this.data = data;
  this.next = null;
}

function Queue() {
  let head = null;
  let rear = null;

  this.enqueue = (value) => {
    const newNode = new Node(value);

    if (head === null) {
      head = rear = newNode;
      return;
    }

    rear.next = newNode;
    rear = newNode;
  };

  this.dequeue = () => {
    if (this.empty()) {
      return null;
    }
    const popData = head.data;

    if (head === rear) {
      head = null;
      rear = null;
      return popData;
    }

    head = head.next;

    return popData;
  };

  this.empty = () => {
    return head === null;
  };

  this.reverse = () => {
    let prev = null;
    let next = null;
    let current = head;
    rear = head;

    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    head = prev;
  };
}

const V = 7;
const E = 8;
const edges = [
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 4],
  [4, 7],
  [5, 6],
  [6, 4],
];
const graph = Array.from({ length: V + 1 }, () => []);
const inDegree = Array(V + 1).fill(0);

for (let i = 0; i < E; i++) {
  const [start, end] = edges[i];
  graph[start].push(end);
  inDegree[end] += 1;
}

function topologySort() {
  let result = [];

  const queue = new Queue();

  for (let i = 1; i < V + 1; i++) {
    if (inDegree[i] === 0) {
      queue.enqueue(i);
    }
  }

  while (!queue.empty()) {
    let now = queue.dequeue();
    result.push(now);

    for (const node of graph[now]) {
      inDegree[node] -= 1;

      if (inDegree[node] === 0) {
        queue.enqueue(node);
      }
    }
  }

  return result;
}

console.log(topologySort());
