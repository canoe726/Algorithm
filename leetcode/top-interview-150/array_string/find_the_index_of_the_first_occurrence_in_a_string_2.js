/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (haystack.length < needle.length) {
    return -1;
  }

  let index = 0;
  for (let i = 0; i < haystack.length; i++) {
    if (needle[index] === haystack[i]) {
      index += 1;

      if (index === needle.length) {
        return i - needle.length + 1;
      }
    } else {
      i = i - index;
      index = 0;
    }
  }

  return -1;
};

console.log(strStr('mississippi', 'issip'));
console.log(strStr('sadbutsad', 'sad'));
