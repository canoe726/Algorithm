/**
 * @param {number[]} nums
 * @return {boolean}
 */

var canJump = function (nums) {
  let dest = nums.length - 1;

  for (let i = dest - 1; i >= 0; i--) {
    if (i + nums[i] >= dest) {
      dest = i;
    }
  }

  return dest === 0;
};
