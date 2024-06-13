/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const merged = [];

  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  let i;
  for (i = 1; i < intervals.length; i++) {
    if (intervals[i - 1][1] >= intervals[i][0]) {
      const min = Math.min(intervals[i - 1][0], intervals[i][0]);
      const max = Math.max(intervals[i - 1][1], intervals[i][1]);

      intervals[i][0] = min;
      intervals[i][1] = max;
    } else {
      merged.push(intervals[i - 1]);
    }
  }
  merged.push(intervals[i - 1]);

  return merged;
};

console.log(
  merge([
    [1, 4],
    [2, 3],
  ]),
);
