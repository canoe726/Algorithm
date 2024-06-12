/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let n = matrix.length;
  let depth = Math.floor(n / 2);

  for (let i = 0; i < depth; i++) {
    let len = n - 2 * i - 1;
    let opp = n - 1 - i;

    for (let j = 0; j < len; j++) {
      let temp = matrix[i][i + j];
      matrix[i][i + j] = matrix[opp - j][i];
      matrix[opp - j][i] = matrix[opp][opp - j];
      matrix[opp][opp - j] = matrix[i + j][opp];
      matrix[i + j][opp] = temp;
    }
  }

  return matrix;
};

console.log(
  rotate([
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ]),
);

// [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
