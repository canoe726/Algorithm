const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');
const [N, M] = n.split(' ');
const chessBoard = arr.map((a) => a.split(''));

function cloneDeep(startX, startY, chessBoard, size = 8) {
  const newChessBoard = [...Array(size)].map(() => Array(size));

  let xIndex = 0;
  for (let x = startX; x < startX + size; x++) {
    let yIndex = 0;
    for (let y = startY; y < startY + size; y++) {
      newChessBoard[xIndex][yIndex] = chessBoard[x][y];
      yIndex += 1;
    }
    xIndex += 1;
  }

  return newChessBoard;
}

function getRepaintCount(leftTop, newChessBoard, size) {
  let count = 0;

  for (let x = 0; x < size; x++) {
    let base = '';
    if (x % 2 === 0) {
      base = leftTop;
    } else {
      base = leftTop === 'W' ? 'B' : 'W';
    }

    for (let y = 0; y < size; y++) {
      if (y % 2 === 0 && base !== newChessBoard[x][y]) {
        newChessBoard[x][y] = base;
        count += 1;
      }
      if (y % 2 === 1 && base === newChessBoard[x][y]) {
        newChessBoard[x][y] = base === 'W' ? 'B' : 'W';
        count += 1;
      }
    }
  }

  return count;
}

function main(N, M, chessBoard) {
  const CHESS_BOARD_SIZE = 8;
  let answer = 99999;

  for (let x = 0; x < N - CHESS_BOARD_SIZE + 1; x++) {
    for (let y = 0; y < M - CHESS_BOARD_SIZE + 1; y++) {
      const wStartCount = getRepaintCount(
        'W',
        cloneDeep(x, y, chessBoard, CHESS_BOARD_SIZE),
        CHESS_BOARD_SIZE,
      );
      const bStartCount = getRepaintCount(
        'B',
        cloneDeep(x, y, chessBoard, CHESS_BOARD_SIZE),
        CHESS_BOARD_SIZE,
      );

      answer = Math.min(answer, wStartCount);
      answer = Math.min(answer, bStartCount);
    }
  }

  return answer;
}

const response = main(Number(N), Number(M), chessBoard);
console.log(response);
