/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length < 2) {
    return s.length;
  }

  let answer = 1;
  let cnt = Array(123).fill(false);

  for (let size = 2; size <= s.length; size++) {
    let exist = true;

    for (let i = 0; i <= s.length - size; i++) {
      cnt = cnt.map(() => false);
      exist = true;

      for (let j = i; j < i + size; j++) {
        if (cnt[s.charCodeAt(j)]) {
          exist = false;
          break;
        }
        cnt[s.charCodeAt(j)] = true;
      }

      if (exist) {
        answer = size;
        break;
      }
    }

    if (!exist) {
      return answer;
    }
  }

  return answer;
};

console.log(lengthOfLongestSubstring(''));
