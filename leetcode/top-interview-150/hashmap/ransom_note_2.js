/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  for (let i = 0; i < magazine.length; i++) {
    const ch = magazine[i];
    ransomNote = ransomNote.replace(ch, '');
  }

  return ransomNote.length === 0;
};

console.log(canConstruct('aba', 'aab'));
