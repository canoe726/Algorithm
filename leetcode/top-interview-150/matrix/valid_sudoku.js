function getNums() {
  return Array(10).fill(0);
}

function checkRow(board) {
  for (let i = 0; i < 9; i++) {
    const nums = getNums();

    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') {
        continue;
      }
      const num = Number(board[i][j]);
      nums[num] += 1;
      if (nums[num] > 1) {
        return false;
      }
    }
  }

  return true;
}

function checkColumn(board) {
  for (let j = 0; j < 9; j++) {
    const nums = getNums();

    for (let i = 0; i < 9; i++) {
      if (board[i][j] === '.') {
        continue;
      }
      const num = Number(board[i][j]);
      nums[num] += 1;
      if (nums[num] > 1) {
        return false;
      }
    }
  }

  return true;
}

function checkSquare(board) {
  for (let x = 0; x < 9; x += 3) {
    for (let y = 0; y < 9; y += 3) {
      const nums = getNums();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[x + i][y + j] === '.') {
            continue;
          }

          const num = Number(board[x + i][y + j]);
          nums[num] += 1;
          if (nums[num] > 1) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  if (!checkRow(board) || !checkColumn(board) || !checkSquare(board)) {
    return false;
  }
  return true;
};

console.log(
  isValidSudoku([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ]),
);
