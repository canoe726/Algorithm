const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './test')
  .toString()
  .trim();

console.log(n, input);
