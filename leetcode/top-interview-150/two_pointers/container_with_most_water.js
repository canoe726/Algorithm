function getArea(height, left, right) {
  return Math.min(height[left], height[right]) * (right - left);
}

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let answer = getArea(height, left, right);

  while (left < right) {
    answer = Math.max(answer, getArea(height, left, right));

    if (height[left] > height[right]) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return answer;
};

console.log(maxArea([1, 3, 2, 5, 25, 24, 5]));
