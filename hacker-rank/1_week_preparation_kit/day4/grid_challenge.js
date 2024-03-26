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
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function gridChallenge(grid, n) {
  for (let i = 0; i < n; i++) {
    grid[i] = grid[i].split('').sort().join('');
  }

  for (let col = 0; col < n; col++) {
    let prev = grid[0][col];

    for (let i = 1; i < n; i++) {
      if (prev > grid[i][col]) {
        return 'NO';
      }

      prev = grid[i][col];
    }
  }

  return 'YES';
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine().trim(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
      const gridItem = readLine();
      grid.push(gridItem);
    }

    const result = gridChallenge(grid, n);

    ws.write(result + '\n');
  }

  ws.end();
}
