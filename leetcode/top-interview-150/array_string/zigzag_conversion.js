/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows <= 1) {
    return s;
  }
  let zigzag = new Array(numRows).fill(0).map(() => new Array());
  let zIndex = 0;
  let plus = 1;

  for (let i = 0; i < s.length; i++) {
    zigzag[zIndex].push(s[i]);
    zIndex += plus;

    if (zIndex < 0) {
      plus = 1;
      zIndex = 1;
    }
    if (zIndex >= numRows) {
      plus = -1;
      zIndex = numRows - 2;
    }
  }

  return zigzag.reduce((acc, cur) => {
    return acc + cur.join('');
  }, '');
};

console.log(convert('PAYPALISHIRING', 4));
