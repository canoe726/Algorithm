const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

function main(n, arr) {}

const response = main(n, arr);
console.log(response);
