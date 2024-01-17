const fs = require('fs');
const path = require('path');

const [n, ...arr] = fs
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : path.resolve(__dirname, 'input'))
  .toString()
  .trim()
  .split('\n');

function main(n, arr) {
  let answer = 0;

  return answer;
}

const response = main(n, arr);
console.log(response);
