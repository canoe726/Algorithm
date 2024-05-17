/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = [];
  let temp = '';

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      temp += s[i];
    } else {
      if (temp.length > 0) {
        words.push(temp);
        temp = '';
      }
    }
  }
  if (temp.length > 0) {
    words.push(temp);
  }

  return words.reverse().join(' ');
};
