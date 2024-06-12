/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  // must use in-place algorithm
  const rSize = matrix.length;
  const cSize = matrix[0].length;

  for (let i = 0; i < rSize; i++) {
    for (let j = 0; j < cSize; j++) {
      if (matrix[i][j] === 0) {
        for (let row = 0; row < rSize; row++) {
          if (matrix[row][j] !== 0) {
            matrix[row][j] = null;
          }
        }

        for (let col = 0; col < cSize; col++) {
          if (matrix[i][col] !== 0) {
            matrix[i][col] = null;
          }
        }
      }
    }
  }

  for (let i = 0; i < rSize; i++) {
    for (let j = 0; j < cSize; j++) {
      if (matrix[i][j] === null) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};

console.log(
  setZeroes([
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ]),
);
