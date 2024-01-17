const fs = require('fs');
const path = require('path');

const [n, ...arr] = fs
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : path.resolve(__dirname, 'input'))
  .toString()
  .trim()
  .split('\n');

function main(n, arr) {
  let answer = 0;

  arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  const task = Array.from({ length: n }).map(() => 0);
  for (let i = 0; i < n; i++) {
    const [leftDays, score] = arr[i];

    for (let dIndex = leftDays - 1; dIndex >= 0; dIndex--) {
      const tScore = task[dIndex];
      if (tScore === 0) {
        task[dIndex] = score;
        break;
      }
    }
  }
  answer = task.reduce((acc, cur) => acc + cur, 0);

  return answer;
}

const response = main(
  Number(n),
  arr.map((a) => a.split(' ').map((a) => Number(a))),
);
console.log(response);
