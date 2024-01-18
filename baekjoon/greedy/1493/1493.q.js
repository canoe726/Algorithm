const fs = require('fs');
const path = require('path');

const [args, n, ...arr] = fs
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : path.resolve(__dirname, 'input'))
  .toString()
  .trim()
  .split('\n');

const [length, width, height] = args.split(' ');

function main(length, width, height, N, arr) {
  let answer = 0;

  console.log(length, width, height, N, arr);

  return answer;
}

const response = main(
  Number(length),
  Number(width),
  Number(height),
  Number(n),
  arr.map((a) => a.split(' ').map((a) => Number(a))),
);
console.log(response);
