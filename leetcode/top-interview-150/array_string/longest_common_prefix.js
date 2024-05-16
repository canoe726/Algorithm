/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  strs.sort((a, b) => a.length - b.length);

  let answer = '';
  let size = strs[0].length;

  for (let i = 0; i < size; i++) {
    let item = strs[0][i];
    let isSame = true;

    for (let j = 1; j < strs.length; j++) {
      if (item !== strs[j][i]) {
        isSame = false;
        break;
      }
    }

    if (isSame) {
      answer += item;
    } else {
      break;
    }
  }

  return answer;
};
