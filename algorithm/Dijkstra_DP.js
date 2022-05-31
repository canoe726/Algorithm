// 하나의 정점에서 다른 모든 정점으로 가는 최단 경로
// 최단 거리는 여러 개의 최단 거리로 이루어짐
const size = 6;
const INF = 100000000;

const graph = [
  [0, 2, 5, 1, INF, INF],
  [2, 0, 3, 2, INF, INF],
  [5, 3, 0, 3, 1, 5],
  [1, 2, 3, 0, 1, INF],
  [INF, INF, 1, 1, 0, 2],
  [INF, INF, 5, INF, 2, 0],
];

const visited = Array.from({ length: size }, () => false);
const dist = Array.from({ length: size }, () => 0);

function getMinIndex () {
  let min = INF;
  let index = 0;
  for (let i = 0; i < size; i++) {
    if (!visited[i] && dist[i] < min) {
      min = dist[i];
      index = i;
    }
  }
  return index;
}

function dijkstra (node) {
  for (let i = 0; i < size; i++) {
    dist[i] = graph[node][i];
  }

  visited[node] = true;
  for (let i = 0; i < size - 1; i++) {
    const curNode = getMinIndex();
    visited[curNode] = true;
    for (let j = 0; j < size; j++) {
      if (!visited[j] && dist[curNode] + graph[curNode][j] < dist[j]) {
        dist[j] = dist[curNode] + graph[curNode][j];
      }
    }
  }
}

dijkstra(0);
console.log(dist);