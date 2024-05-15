/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let cur = 0;
  let prev = roman[s[0]];
  let total = prev;

  for (let i = 1; i < s.length; i++) {
    cur = roman[s[i]];

    if (prev >= cur) {
      total += cur;
    } else {
      total += cur - 2 * prev;
    }
    prev = cur;
  }

  return total;
};
