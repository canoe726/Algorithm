function isInRange(x, y, m, n) {
  if (x < 0 || x >= m || y < 0 || y >= n) {
    return false;
  }
  return true;
}

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let visited = Array.from({ length: m }, () => Array.from({ length: n }, () => false));
  let count = 0;
  let plus = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let pIndex = 0;
  let x = 0;
  let y = 0;
  let answer = [];

  while (count < m * n) {
    visited[x][y] = true;
    count += 1;
    const [px, py] = plus[pIndex];
    let [nx, ny] = [x + px, y + py];

    if (!isInRange(nx, ny, m, n) || visited[nx][ny]) {
      pIndex += 1;
      if (pIndex > 3) {
        pIndex = 0;
      }

      if (count >= m * n) {
        break;
      }
      count -= 1;
      continue;
    }

    answer.push(matrix[x][y]);
    x = nx;
    y = ny;
  }
  answer.push(matrix[x][y]);

  return answer;
};

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
);
