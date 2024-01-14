const lines = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

const SIZE = 11;

function main(lines) {
  lines = lines.sort((a, b) => a[0] - b[0]);

  let answer = 0;
  let totalTimes = 0;

  for (let i = 0; i < SIZE; i++) {
    totalTimes += lines[i][0];

    answer += totalTimes + lines[i][1] * 20;
  }

  return answer;
}

const response = main(lines.map((l) => l.split(' ').map((l) => Number(l))));
console.log(response);
