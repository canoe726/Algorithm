/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  intervals.push(newInterval);
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  let answer = [];
  let i;
  for (i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      intervals[i + 1][0] = Math.min(intervals[i][0], intervals[i + 1][0]);
      intervals[i + 1][1] = Math.max(intervals[i][1], intervals[i + 1][1]);
    } else {
      answer.push(intervals[i]);
    }
  }
  answer.push(intervals[i]);

  return answer;
};

console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8],
  ),
);
