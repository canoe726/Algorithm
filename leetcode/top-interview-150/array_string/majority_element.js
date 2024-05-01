/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let m = nums[0];
  let cnt = 1;

  for (let i = 1; i < nums.length; i++) {
    if (m === nums[i]) {
      cnt += 1;
    } else {
      cnt -= 1;
    }

    if (cnt < 0) {
      m = nums[i];
      cnt = 1;
    }
  }

  return m;
};
