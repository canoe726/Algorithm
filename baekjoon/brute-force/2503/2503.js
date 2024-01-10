const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');
const baseballs = arr.map((a) => a.split(' '));

function main(n, inputArr) {
  let answer = 0;
  const N = inputArr.length;

  for (let number = 111; number <= 999; number++) {
    const testCase = number.toString().split('');
    const uniqueNumbers = [...new Set(testCase)];
    let validCount = 0;

    if (uniqueNumbers.length !== testCase.length) {
      continue;
    }
    if (uniqueNumbers[0] === '0' || uniqueNumbers[1] === '0' || uniqueNumbers[2] === '0') {
      continue;
    }

    for (let index = 0; index < N; index++) {
      const [baseball, ss, bb] = inputArr[index];
      const [strike, ball] = [Number(ss), Number(bb)];
      const baseballNumber = baseball.split('');

      let s = 0;
      let b = 0;

      for (let n = 0; n < 3; n++) {
        if (testCase[n] === baseballNumber[n]) {
          s += 1;
        } else {
          if (baseballNumber.indexOf(testCase[n]) >= 0) {
            b += 1;
          }
        }
      }

      if (strike === s && ball === b) {
        validCount += 1;
      }
    }

    if (validCount === N) {
      answer += 1;
    }
  }

  return answer;
}

const response = main(n, baseballs);
console.log(response);
