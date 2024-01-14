const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

const [N, L] = n.split(' ').map((n) => Number(n));
const numbers = arr
  .map((a) => a.split(' '))
  .flat()
  .map((a) => Number(a));

function main(N, L, numbers) {
  const numberList = numbers.sort((a, b) => a - b);
  let answer = 0;

  for (let i = 0; i < N; i++) {
    const base = numberList[i];
    answer += 1;

    let isCovered = false;
    const tapedBase = base + L - 1;

    for (let j = i + 1; j < N; j++) {
      if (tapedBase >= numberList[j]) {
        i += 1;
        isCovered = true;
      } else {
        continue;
      }
    }
  }

  return answer;
}

const response = main(N, L, numbers);
console.log(response);
