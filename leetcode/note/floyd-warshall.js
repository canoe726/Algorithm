const INF = Number(1e9);
const V = 4;
const E = [
  [1, 2, 4],
  [1, 4, 6],
  [2, 1, 3],
  [2, 3, 7],
  [3, 1, 5],
  [3, 4, 4],
  [4, 3, 2],
];
const distance = Array.from({ length: V }, () => Array.from({ length: V }, () => INF));

for (const edge of E) {
  const [s, e, cost] = edge;
  let start = s - 1;
  let end = e - 1;
  distance[start][end] = cost;
}

for (let i = 0; i < V; i++) {
  distance[i][i] = 0;
}

function floydWarshall() {
  for (let v = 0; v < V; v++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][v] + distance[v][j]);
      }
    }
  }
}

floydWarshall();
console.log(distance);
