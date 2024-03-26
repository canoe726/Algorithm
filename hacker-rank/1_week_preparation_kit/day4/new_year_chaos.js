'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */
function swapArr(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function minimumBribes(q, n) {
  const asc = Array(n);
  for (let i = 0; i < n; i++) {
    asc[i] = i + 1;
  }

  let numBribes = 0;
  for (let i = 0; i < n - 1; i++) {
    if (q[i] != asc[i]) {
      let findNumber = false;

      for (let j = i + 2; j > i; j--) {
        if (findNumber) {
          numBribes += 1;
          swapArr(asc, j - 1, j);
          continue;
        }

        if (q[i] === asc[j]) {
          numBribes += 1;
          swapArr(asc, j - 1, j);
          findNumber = true;
        }
      }

      if (!findNumber) {
        console.log('Too chaotic');
        return;
      }
    }
  }

  console.log(numBribes);
}

function main() {
  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    const q = readLine()
      .replace(/\s+$/g, '')
      .split(' ')
      .map((qTemp) => parseInt(qTemp, 10));

    minimumBribes(q, n);
  }
}
