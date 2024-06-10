/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }

  let answer = 1;
  let cnt = Array(123).fill(0);

  for (let size = 2; size <= s.length; size++) {
    let exist = true;
    for (let i = 0; i <= s.length - size; i++) {
      cnt = cnt.map(() => 0);
      exist = true;

      for (let j = i; j < i + size; j++) {
        cnt[s.charCodeAt(j)] += 1;

        if (cnt[s.charCodeAt(j)] > 1) {
          exist = false;
          break;
        }
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
