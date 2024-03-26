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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function isPalindrome(s) {
  const size = s.length;
  const mid = Math.floor(size / 2);

  for (let i = 0; i < mid; i++) {
    if (s[i] !== s[size - 1 - i]) {
      return false;
    }
  }
  return true;
}

function palindromeIndex(s) {
  let index = 0;
  const size = s.length;
  const mid = Math.floor(size / 2);

  while (index < mid) {
    if (s[index] === s[size - 1 - index]) {
      index += 1;
    } else {
      break;
    }
  }
  // already palindrome
  if (index >= mid) {
    return -1;
  }

  let start = index;
  let end = size - 1 - index;

  const removeFirst = s.slice(start + 1, end + 1);
  if (isPalindrome(removeFirst)) {
    return start;
  }

  const removeLast = s.slice(start, end);
  if (isPalindrome(removeLast)) {
    return end;
  }

  return -1;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = palindromeIndex(s);

    ws.write(result + '\n');
  }

  ws.end();
}
