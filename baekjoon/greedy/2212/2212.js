const [n, k, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

function main(n, k, arr) {
  let answer = 0;
  arr.sort((a, b) => a - b);
  console.log(n, k, arr);

  return answer;
}

const response = main(
  Number(n),
  Number(k),
  arr[0].split(' ').map((i) => Number(i)),
);
console.log(response);
