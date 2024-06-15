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

const V = 6;
const E = 4;
const edges = [
  [1, 4],
  [2, 3],
  [2, 4],
  [5, 6],
];
const parent = Array(V + 1).fill(0);
let cycle = false;

for (let i = 1; i < V + 1; i++) {
  parent[i] = i;
}

for (const edge of edges) {
  const [a, b] = edge;

  if (findParent(parent, a) === findParent(parent, b)) {
    cycle = true;
    break;
  } else {
    unionParent(parent, a, b);
  }
}

for (let i = 1; i < V + 1; i++) {
  findParent(parent, i);
}

console.log('cycle: ', cycle);
console.log('parent: ', parent);
