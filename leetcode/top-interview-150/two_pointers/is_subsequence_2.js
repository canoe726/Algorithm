function preprocess(t) {
  const size = t.length;
  const nextPos = Array.from({ length: size + 1 }, () => Array(26).fill(size));

  for (let i = size - 1; i >= 0; i--) {
    for (let alpha = 0; alpha < 26; alpha++) {
      nextPos[i][alpha] = nextPos[i + 1][alpha];
    }
    nextPos[i][t.charCodeAt(i) - 97] = i;
  }

  return nextPos;
}

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  const nextPos = preprocess(t);
  let tIndex = 0;

  for (let i = 0; i < s.length; i++) {
    if (nextPos[tIndex][s.charCodeAt(i) - 97] === t.length) {
      return false;
    }
    tIndex = nextPos[tIndex][s.charCodeAt(i) - 97] + 1;
  }

  return true;
};

console.log(isSubsequence('bhc', 'ahbgdc'));
