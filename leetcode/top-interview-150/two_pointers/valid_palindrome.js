/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const half = Math.floor(str.length / 2);
  const last = str.length - 1;

  for (let i = 0; i < half; i++) {
    if (str[i] !== str[last - i]) {
      return false;
    }
  }
  return true;
};

console.log(isPalindrome('A man, a plan, a canal: Panama'));
