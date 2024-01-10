const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

function getRowMax(n, arr) {
  let rowMax = 0;
  for (let y = 0; y < n; y++) {
    let max = 1;

    for (let x = 0; x < n - 1; x++) {
      if (arr[y][x] === arr[y][x + 1]) {
        max += 1;
      } else {
        if (max > rowMax) {
          rowMax = max;
        }
        max = 1;
      }
    }

    if (max > rowMax) {
      rowMax = max;
    }
  }
  return rowMax;
}

function getColumnMax(n, arr) {
  let columnMax = 0;
  for (let x = 0; x < n; x++) {
    let max = 1;

    for (let y = 0; y < n - 1; y++) {
      if (arr[y][x] === arr[y + 1][x]) {
        max += 1;
      } else {
        if (max > columnMax) {
          columnMax = max;
        }
        max = 1;
      }
    }

    if (max > columnMax) {
      columnMax = max;
    }
  }
  return columnMax;
}

function deepClone(arr) {
  return arr.map((a) => a.slice());
}

function getSwappedArr(arr, pos1, pos2) {
  const newArr = deepClone(arr);
  const [py1, px1] = pos1;
  const [py2, px2] = pos2;

  const temp = newArr[py1][px1];
  newArr[py1][px1] = newArr[py2][px2];
  newArr[py2][px2] = temp;

  return newArr;
}

function main(n, inputArr) {
  const arr = inputArr.map((input) => input.split(''));

  let answer = 0;

  // horizontal
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n - 1; x++) {
      if (arr[y][x] !== arr[y][x + 1]) {
        const swapArr = getSwappedArr(arr, [y, x], [y, x + 1]);
        const maxValue = Math.max(getRowMax(n, swapArr), getColumnMax(n, swapArr));
        answer = Math.max(answer, maxValue);
      }
    }
  }
  // vertical
  for (let y = 0; y < n - 1; y++) {
    for (let x = 0; x < n; x++) {
      if (arr[y][x] !== arr[y + 1][x]) {
        const swapArr = getSwappedArr(arr, [y, x], [y + 1, x]);
        const maxValue = Math.max(getRowMax(n, swapArr), getColumnMax(n, swapArr));
        answer = Math.max(answer, maxValue);
      }
    }
  }

  return answer;
}

const response = main(n, arr);
console.log(response);
