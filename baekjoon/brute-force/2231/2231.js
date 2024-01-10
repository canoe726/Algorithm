const INPUT = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim();

function main(input) {
	const MAX_SIZE = Number(input)
  let answer = 0

	for (let i = 1; i <= MAX_SIZE; i++) {
    let sum = i
    sum += (i).toString().split('').reduce((acc, cur) => {
      return acc + Number(cur)
    }, 0)

    if (sum === MAX_SIZE) {
      answer = i
      break;
    }
	}

  return answer
}

const response = main(INPUT)
console.log(response)
