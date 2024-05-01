/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let i = 2;

  for (let j = 2; j < nums.length; j++) {
    if (nums[i - 2] !== nums[j]) {
      nums[i] = nums[j];
      i += 1;
    }
  }
  return i;
};
