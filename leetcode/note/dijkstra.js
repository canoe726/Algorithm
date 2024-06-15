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
    if (this.empty()) {
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

  this.empty = () => {
    return heap.length === 0;
  };
}

const n = 6;
const m = 11;
const start = 1;
const graph = [
  [],
  [
    [2, 2],
    [3, 5],
    [4, 1],
  ],
  [
    [3, 3],
    [4, 2],
  ],
  [
    [2, 3],
    [6, 5],
  ],
  [
    [3, 3],
    [5, 1],
  ],
  [
    [3, 1],
    [6, 2],
  ],
  [],
];
const INF = Number(1e9);
const distance = Array(n + 1).fill(INF);

function dijkstra(start) {
  const heap = new MinHeap();
  heap.push([0, start]);
  distance[start] = 0;

  while (!heap.empty()) {
    const [dist, now] = heap.pop();

    if (distance[now] < dist) {
      continue;
    }

    for (const item of graph[now]) {
      let cost = dist + item[1];

      if (cost < distance[item[0]]) {
        distance[item[0]] = cost;
        heap.push([cost, item[0]]);
      }
    }
  }
}

dijkstra(start);
console.log('distance: ', distance);
