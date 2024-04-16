/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let prev = nums[0];
  let index = 1;

  for (let i = 1; i < nums.length; i++) {
    if (prev !== nums[i]) {
      nums[index] = nums[i];
      prev = nums[i];
      index += 1;
    }
  }

  return index;
};
