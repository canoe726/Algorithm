const matrix = [
  [1, 2, 3, 4],
  [4, 7, 9, 10],
  [6, 8, 1, 3],
  [0, 5, 1, 2],
];

function getMaxQuad(matrix, n) {
  let value = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      value += matrix[r][c];
    }
  }

  return value;
}

function flipRow(matrix, size, row) {
  const half = Math.floor(size / 2);

  for (let r = 0; r < half; r++) {
    const temp = matrix[row][r];
    matrix[row][r] = matrix[row][size - r - 1];
    matrix[row][size - r - 1] = temp;
  }
}

function flipCol(matrix, size, col) {
  const half = Math.floor(size / 2);

  for (let c = 0; c < half; c++) {
    const temp = matrix[c][col];
    matrix[c][col] = matrix[size - c - 1][col];
    matrix[size - c - 1][col] = temp;
  }
}

function flipMatrix(matrix, n) {
  const size = matrix.length;
  let maxValue = getMaxQuad(matrix, n);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      flipRow(matrix, size, r);
      flipCol(matrix, size, c);

      let value = getMaxQuad(matrix, n);
      if (value > maxValue) {
        maxValue = value;
      }

      flipRow(matrix, size, r);
      flipCol(matrix, size, c);
    }
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      flipCol(matrix, size, c);
      flipRow(matrix, size, r);

      let value = getMaxQuad(matrix, n);
      if (value > maxValue) {
        maxValue = value;
      }

      flipCol(matrix, size, c);
      flipRow(matrix, size, r);
    }
  }

  for (let c = 0; c < size; c++) {
    for (let r = 0; r < size; r++) {
      flipRow(matrix, size, r);
      flipCol(matrix, size, c);

      let value = getMaxQuad(matrix, n);
      if (value > maxValue) {
        maxValue = value;
      }

      flipRow(matrix, size, r);
      flipCol(matrix, size, c);
    }
  }

  for (let c = 0; c < size; c++) {
    for (let r = 0; r < size; r++) {
      flipRow(matrix, size, r);
      flipCol(matrix, size, c);

      let value = getMaxQuad(matrix, n);
      if (value > maxValue) {
        maxValue = value;
      }

      flipRow(matrix, size, r);
      flipCol(matrix, size, c);
    }
  }

  return maxValue;
}

console.log('answer : ', flipMatrix(matrix, 1));
