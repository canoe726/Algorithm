function columnRotate(matrix) {
  const half = Math.floor(matrix.length / 2);
  const size = matrix.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < half; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[i][size - 1 - j];
      matrix[i][size - 1 - j] = temp;
    }
  }
}

function diagonalRotate(matrix) {
  const size = matrix.length - 1;
  let acc = 0;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - acc; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[size - j][size - acc];
      matrix[size - j][size - acc] = temp;
    }
    acc += 1;
  }
}

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  columnRotate(matrix);
  diagonalRotate(matrix);

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
