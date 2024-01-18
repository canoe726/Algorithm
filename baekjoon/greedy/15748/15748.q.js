const fs = require('fs');
const path = require('path');

const [n, ...arr] = fs
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : path.resolve(__dirname, 'input'))
  .toString()
  .trim()
  .split('\n');

const [L, N, Rf, Rb] = n.split(' ');

function main(L, N, Rf, Rb, arr) {
  arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0] - a[0];
    }
    return b[1] - a[1];
  });

  const trails = [[0, 0], ...arr, [L, 0]];

  let answer = 0;
  let farmerSec = 0;
  let bessieSec = 0;
  let curMeter = 0;

  for (let i = 1; i < N + 2; i++) {
    const [Xi, Ci] = [trails[i][0] - curMeter, trails[i][1]];

    if (Xi <= 0 && curMeter >= trails[i][0]) {
      continue;
    }
    curMeter = trails[i][0];

    farmerSec += Xi * Rf;
    bessieSec += Xi * Rb;

    const gap = farmerSec - bessieSec;
    if (gap > 0) {
      answer += gap * Ci;
      bessieSec += gap;
    }
  }

  return answer;
}

const response = main(
  Number(L),
  Number(N),
  Number(Rf),
  Number(Rb),
  arr.map((a) => a.split(' ').map((a) => Number(a))),
);

console.log(response);
