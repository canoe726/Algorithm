const fs = require('fs');
const path = require('path');

const [n, k, ...arr] = fs
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : path.resolve(__dirname, 'input'))
  .toString()
  .trim()
  .split('\n');

function main(n, k, arr) {
  let answer = 0;
  arr.sort((a, b) => a - b);

  const gaps = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const [a1, a2] = [arr[i], arr[i + 1]];
    gaps.push(a2 - a1);
  }
  gaps.sort((a, b) => a - b);

  for (let i = 0; i < k - 1; i++) {
    gaps.pop();
  }
  answer = gaps.reduce((acc, cur) => acc + cur, 0);

  return answer;
}

const response = main(
  Number(n),
  Number(k),
  arr[0].split(' ').map((i) => Number(i)),
);
console.log(response);
