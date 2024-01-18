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
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  let answer = BigInt(0);
  let prevXi = BigInt(0);

  for (let i = 0; i < N; i++) {
    let [Xi, Ci] = arr[i];

    if (Xi < prevXi) {
      continue;
    }

    const gap = (BigInt(Xi) - BigInt(prevXi)) * (BigInt(Rf) - BigInt(Rb));
    answer += BigInt(gap) * BigInt(Ci);
    prevXi = BigInt(Xi);
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
