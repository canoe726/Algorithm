/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let size = height.length;
  let drops = new Array(size).fill(0);
  let base = height[0];

  for (let i = 0; i < size - 1; i++) {
    if (base < height[i + 1]) {
      base = height[i + 1];
    } else {
      drops[i + 1] = base - height[i + 1];
    }
  }

  drops[size - 1] = 0;
  base = height[size - 1];
  for (let i = size - 2; i >= 0; i--) {
    if (height[i] > base) {
      drops[i] = 0;
      base = height[i];
    } else {
      drops[i] = Math.min(drops[i], base - height[i]);
    }
  }

  return drops.reduce((acc, cur) => acc + cur, 0);
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
