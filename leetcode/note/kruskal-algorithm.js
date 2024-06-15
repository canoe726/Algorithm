function findParent(parent, n) {
  if (parent[n] !== n) {
    parent[n] = findParent(parent, parent[n]);
  }
  return parent[n];
}

function unionParent(parent, a, b) {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a > b) {
    parent[a] = b;
  } else {
    parent[b] = a;
  }
}

let minCost = 0;
const V = 7;
const E = 9;
const edges = [
  [1, 2, 29],
  [1, 5, 75],
  [2, 3, 35],
  [2, 6, 34],
  [3, 4, 7],
  [4, 6, 23],
  [4, 7, 13],
  [5, 6, 53],
  [6, 7, 25],
];
const parent = Array(V + 1).fill(0);
edges.sort((a, b) => a[2] - b[2]);

for (let i = 1; i < V + 1; i++) {
  parent[i] = i;
}

for (const edge of edges) {
  const [a, b, cost] = edge;

  if (findParent(parent, a) === findParent(parent, b)) {
    continue;
  }
  unionParent(parent, a, b);
  minCost += cost;
}

console.log(minCost);
