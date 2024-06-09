/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const INF = Number(1e10);
  let answer = INF;
  let total = 0;
  let start = 0;
  let end = 0;

  total = nums[start];

  while (start <= end && end < nums.length) {
    if (total >= target) {
      answer = Math.min(answer, end - start + 1);
      total -= nums[start];
      start += 1;
    } else {
      end += 1;
      total += nums[end];
    }
  }

  if (answer === INF) {
    return 0;
  }
  return answer;
};

console.log(minSubArrayLen(11, [1, 2, 3, 4, 5]));
