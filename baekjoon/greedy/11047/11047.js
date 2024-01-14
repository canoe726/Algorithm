const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

const [N, K] = n.split(' ').map((n) => Number(n));
const coins = arr
  .map((a) => a.split('\n'))
  .flat()
  .map((a) => Number(a));

function main(N, K, coins) {
  let amount = K;
  let answer = 0;
  coins = coins.sort((a, b) => b - a);

  for (let i = 0; i < N; i++) {
    const value = coins[i];
    const div = Math.floor(amount / value);

    answer += div;
    amount %= value;
  }

  return answer;
}

const response = main(N, K, coins);
console.log(response);
