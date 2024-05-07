/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  let size = ratings.length;
  let candy = new Array(size).fill(1);

  for (let i = 1; i < size; i++) {
    if (ratings[i - 1] < ratings[i]) {
      candy[i] = candy[i - 1] + 1;
    }
  }

  for (let i = size - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candy[i] = Math.max(candy[i], candy[i + 1] + 1);
    }
  }

  return candy.reduce((acc, cur) => acc + cur, 0);
};
