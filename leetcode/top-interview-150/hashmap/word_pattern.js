/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) {
    return false;
  }

  const pMap = new Map();
  const sMap = new Map();

  for (let i = 0; i < pattern.length; i++) {
    if (pMap.has(pattern[i])) {
      if (pMap.get(pattern[i]) !== words[i]) {
        return false;
      }
    } else {
      if (!sMap.has(words[i])) {
        sMap.set(words[i], pattern[i]);
        pMap.set(pattern[i], words[i]);
      } else {
        return false;
      }
    }
  }

  return true;
};

console.log(wordPattern('aaa', 'aa aa aa aa'));
