/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let p1 = 0;

  for (let i = 0; i < t.length; i++) {
    if (s[p1] === t[i]) {
      p1 += 1;
    }
  }

  if (p1 >= s.length) {
    return true;
  }
  return false;
};

console.log(isSubsequence('abc', 'ahbgdc'));
