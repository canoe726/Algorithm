function getPrefixSum(nums) {
  const sum = [0, nums[0]];
  for (let i = 1; i < nums.length; i++) {
    sum.push(nums[i] + sum[i]);
  }
  return sum;
}

function binarySearch(prefixSum, target) {
  let left = 0;
  let right = prefixSum.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (prefixSum[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left >= prefixSum.length ? -1 : left;
}

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const prefixSum = getPrefixSum(nums);
  let answer = Infinity;

  for (let i = 1; i < prefixSum.length; i++) {
    let last = binarySearch(prefixSum, target + prefixSum[i - 1]);
    if (last !== -1) {
      answer = Math.min(answer, last - i + 1);
    }
  }

  return answer === Infinity ? 0 : answer;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
