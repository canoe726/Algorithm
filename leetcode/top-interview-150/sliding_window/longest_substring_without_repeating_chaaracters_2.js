/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let maxLength = 0;
  let charset = new Set();

  for (let right = 0; right < s.length; right++) {
    while (charset.has(s[right])) {
      charset.delete(s[left]);
      left += 1;
    }

    charset.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

console.log(lengthOfLongestSubstring('abcabcbb'));
