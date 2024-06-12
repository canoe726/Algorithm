/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const mMap = new Map();
  const rMap = new Map();

  for (let i = 0; i < magazine.length; i++) {
    if (mMap.has(magazine[i])) {
      mMap.set(magazine[i], mMap.get(magazine[i]) + 1);
    } else {
      mMap.set(magazine[i], 1);
    }
  }

  for (let i = 0; i < ransomNote.length; i++) {
    if (rMap.has(ransomNote[i])) {
      rMap.set(ransomNote[i], rMap.get(ransomNote[i]) + 1);
    } else {
      rMap.set(ransomNote[i], 1);
    }
  }

  for (let i = 0; i < ransomNote.length; i++) {
    if (!mMap.has(ransomNote[i])) {
      return false;
    } else {
      const value = mMap.get(ransomNote[i]);
      if (value === 0) {
        return false;
      } else {
        mMap.set(ransomNote[i], mMap.get(ransomNote[i]) - 1);
      }
    }
  }

  return true;
};

console.log(canConstruct('aba', 'aab'));
