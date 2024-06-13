/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  if (nums.length === 0) {
    return [];
  }

  let answer = [];
  let start = 0;
  let end = 0;

  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - nums[i - 1];

    if (diff === 1) {
      end += 1;
    } else {
      if (start === end) {
        answer.push(`${nums[start]}`);
      } else {
        answer.push(`${nums[start]}->${nums[end]}`);
      }

      start = i;
      end = i;
    }
  }
  if (start === end) {
    answer.push(`${nums[start]}`);
  } else {
    answer.push(`${nums[start]}->${nums[end]}`);
  }

  return answer;
};

console.log(summaryRanges([]));
