/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  const item = s.split(' ').filter((i) => i !== '');
  return item[item.length - 1].length;
};

lengthOfLastWord('   fly me   to   the moon  ');
