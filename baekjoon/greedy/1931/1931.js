const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

function main(n, arr) {
  arr = arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });
  let answer = 1;

  let [start, end] = arr[0];
  for (let i = 1; i < n; i++) {
    const [curStart, curEnd] = arr[i];

    if (end <= curStart) {
      start = curStart;
      end = curEnd;

      answer += 1;
    }
  }

  return answer;
}

const response = main(
  n,
  arr.map((a) => a.split(' ').map((a) => Number(a))),
);
console.log(response);
