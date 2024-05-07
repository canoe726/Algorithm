/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  let size = ratings.length;
  let candy = new Array(size).fill(0);
  let answer = 0;
  candy[0] = 1;

  for (let i = 1; i < size; i++) {
    if (ratings[i - 1] < ratings[i]) {
      candy[i] = 1 + candy[i - 1];
    } else if (ratings[i - 1] > ratings[i]) {
      let prev = candy[i - 1];

      if (prev > 1) {
        candy[i] = 1;
      } else {
        candy[i] = prev;
        candy[i - 1]++;
      }
    } else {
      candy[i] = 1;
    }
  }

  for (let i = size - 1; i > 0; i--) {
    if (ratings[i - 1] > ratings[i] && candy[i - 1] <= candy[i]) {
      candy[i - 1] = candy[i] + 1;
    }
    answer += candy[i];
  }
  answer += candy[0];

  return answer;
};

console.log(candy([1, 2, 87, 87, 87, 87, 3, 2, 1]));
