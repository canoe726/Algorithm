// 하나의 정점에서 다른 모든 정점으로 가는 최단 경로
// 최단 거리는 여러 개의 최단 거리로 이루어짐
const MinHeap = require('../data-structure/min_heap');

const pq = new MinHeap();

const size = 6;
const INF = 100000000;

const graph = {
  // [노드, 거리]
  1: [
    [2, 2],
    [3, 5],
    [4, 1],
  ],
  2: [
    [1, 2],
    [3, 3],
    [4, 2],
  ],
  3: [
    [1, 5],
    [2, 3],
    [4, 3],
    [5, 1],
    [6, 5],
  ],
  4: [
    [1, 1],
    [2, 2],
    [3, 3],
    [5, 1],
  ],
  5: [
    [3, 1],
    [4, 1],
    [6, 2],
  ],
  6: [
    [3, 5],
    [5, 2],
  ],
};

const dist = Array.from({ length: size + 1 }, () => INF);

function dijkstra(node) {
  dist[node] = 0;
  const pq = new MinHeap();
  pq.push([node, 0]);

  while (!pq.empty()) {
    const [curNode, curDist] = pq.pop();
    const curDistance = curDist * -1;

    if (dist[curNode] < curDistance) continue;
    for (let i = 0; i < graph[curNode].length; i++) {
      const [n, d] = graph[curNode][i];
      const nextDist = curDistance + d;
      if (dist[n] > nextDist) {
        dist[n] = nextDist;
        pq.push([n, -nextDist]);
      }
    }
  }
}

dijkstra(1);
console.log(dist);
