/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let total = 0;
  let idx1 = 0;
  let idx2 = numbers.length - 1;

  while (idx1 < idx2) {
    total = numbers[idx1] + numbers[idx2];
    if (total === target) {
      break;
    }

    if (total > target) {
      idx2 -= 1;
    } else {
      idx1 += 1;
    }
  }

  return [idx1 + 1, idx2 + 1];
};

console.log(twoSum([3, 24, 50, 79, 88, 150, 345], 200));
