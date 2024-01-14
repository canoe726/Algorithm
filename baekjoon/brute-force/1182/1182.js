const [n, arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');
const [N, S] = n.split(' ');
const numbers = arr.split(' ').map((a) => Number(a));

function pickNumber(numbers, N, S, index, picked, answer) {
  if (picked.length === N) {
    const notPicked = !picked.some((p) => p === true);
    if (notPicked) {
      return;
    }

    let sum = 0;
    for (let i = 0; i < picked.length; i++) {
      if (picked[i]) {
        sum += numbers[i];
      }
    }

    if (sum === S) {
      answer[0] += 1;
    }

    return;
  }

  picked.push(true);
  pickNumber(numbers, N, S, index + 1, picked, answer);
  picked.pop();

  picked.push(false);
  pickNumber(numbers, N, S, index + 1, picked, answer);
  picked.pop();
}

function main(N, S, numbers) {
  const answer = [0];
  const picked = [];

  pickNumber(numbers, N, S, 0, picked, answer);

  return answer[0];
}

const response = main(Number(N), Number(S), numbers);
console.log(response);
