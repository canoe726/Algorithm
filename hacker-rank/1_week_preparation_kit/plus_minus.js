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

function fixedNumber(num, f = 6) {
  return num.toFixed(6);
}

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr, n) {
  // Write your code here
  let plus = 0;
  let minus = 0;
  let zero = 0;

  arr.forEach((item) => {
    if (item > 0) {
      plus += 1;
    } else if (item === 0) {
      zero += 1;
    } else {
      minus += 1;
    }
  });

  console.log(fixedNumber(plus / n, 6)); // positive
  console.log(fixedNumber(minus / n, 6)); // negative
  console.log(fixedNumber(zero / n, 6)); // zero
}

function main() {
  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10));

  plusMinus(arr, n);
}
