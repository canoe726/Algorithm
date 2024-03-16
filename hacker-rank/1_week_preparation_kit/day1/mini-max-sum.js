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

function merge(arr, start, mid, end) {
  const sorted = new Array(arr.length).fill(0);
  let s_idx = start;
  let left = start;
  let right = mid + 1;

  while (left <= mid && right <= end) {
    if (arr[left] <= arr[right]) {
      sorted[s_idx] = arr[left];
      left += 1;
    } else {
      sorted[s_idx] = arr[right];
      right += 1;
    }
    s_idx += 1;
  }

  if (left > mid) {
    for (let i = right; i <= end; i++) {
      sorted[s_idx] = arr[i];
      s_idx += 1;
    }
  } else {
    for (let i = left; i <= mid; i++) {
      sorted[s_idx] = arr[i];
      s_idx += 1;
    }
  }

  for (let i = start; i <= end; i++) {
    arr[i] = sorted[i];
  }
}

function merge_sort(arr, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    merge_sort(arr, start, mid);
    merge_sort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
}

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
  merge_sort(arr, 0, arr.length - 1);

  let minValue = 0n;
  let maxValue = 0n;

  const SIZE = 4;
  for (let i = 0; i < SIZE; i++) {
    minValue += BigInt(arr[i]);
  }
  for (let i = arr.length - SIZE; i < arr.length; i++) {
    maxValue += BigInt(arr[i]);
  }

  console.log(minValue.toString(), maxValue.toString());
}

function main() {
  const arr = readLine()
    .replace(/\s+$/g, '')
    .split(' ')
    .map((arrTemp) => parseInt(arrTemp, 10));

  miniMaxSum(arr);
}
