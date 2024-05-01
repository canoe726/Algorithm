/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let count = 0;
  let farthest = 0;
  let end = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === end) {
      end = farthest;
      count++;
    }
  }

  return count;
};
