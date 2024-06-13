/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const word = new Map();

  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    if (word.has(s[i])) {
      word.set(s[i], word.get(s[i]) + 1);
    } else {
      word.set(s[i], 1);
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (!word.has(t[i]) || word.get(t[i]) === 0) {
      return false;
    } else {
      word.set(t[i], word.get(t[i]) - 1);
    }
  }

  return true;
};

console.log(isAnagram('aacc', 'ccac'));
