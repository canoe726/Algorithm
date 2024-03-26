'use strict';

const fs = require('fs');

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
 * Complete the 'superDigit' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING n
 *  2. INTEGER k
 */
function superDigit(n, k) {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    sum += parseInt(n[i], 10);
  }
  sum *= k;

  let digitStr = String(sum);
  while (digitStr.length > 1) {
    let superSum = 0;
    for (let i = 0; i < digitStr.length; i++) {
      superSum += parseInt(digitStr[i], 10);
    }

    digitStr = String(superSum);
  }

  return digitStr;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = firstMultipleInput[0];

  const k = parseInt(firstMultipleInput[1], 10);

  const result = superDigit(n, k);

  ws.write(result + '\n');

  ws.end();
}
