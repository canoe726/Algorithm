/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  let answer = 0;
  const set = new Set(nums);

  for (const value of set) {
    if (!set.has(value - 1)) {
      let cnt = 1;
      let next = value + 1;

      while (set.has(next)) {
        cnt += 1;
        next += 1;
      }

      if (cnt > answer) {
        answer = cnt;
      }
    }
  }

  return answer;
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));

// [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
