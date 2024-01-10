const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');

/**
 * @see
 * Tn = n(n+1)/2
 *
 * T45 = 1035
 */
function getTriangleNumber(size = 45) {
  const triangle = [-1];

  for (let index = 1; index <= size; index++) {
    triangle[index] = (index * (index + 1)) / 2;
  }

  return triangle;
}

function isConsistOfThreeTriangleNumber(number, triangle) {
  let existNumber = 0;
  const sizeOfTri = triangle.length;

  for (let first = 1; first < sizeOfTri; first++) {
    for (let second = 1; second < sizeOfTri; second++) {
      for (let third = 1; third < sizeOfTri; third++) {
        const value = triangle[first] + triangle[second] + triangle[third];
        if (value === number) {
          existNumber = 1;
        }
      }
    }
  }

  return existNumber;
}

function main(n, inputArr) {
  const triangle = getTriangleNumber();

  for (let index = 0; index < n; index++) {
    const number = Number(inputArr[index]);
    const answer = isConsistOfThreeTriangleNumber(number, triangle);

    console.log(answer);
  }
}

main(n, arr);
