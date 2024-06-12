/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const size = s.length;
  let sMap = new Map();
  let tMap = new Map();

  for (let i = 0; i < size; i++) {
    if (sMap.has(s[i])) {
      sMap.set(s[i], sMap.get(s[i]) + 1);
    } else {
      sMap.set(s[i], 1);
    }

    if (tMap.has(t[i])) {
      tMap.set(t[i], tMap.get(t[i]) + 1);
    } else {
      tMap.set(t[i], 1);
    }
  }

  if (sMap.size !== tMap.size) {
    return false;
  }

  const replaceMap = {};
  while (sMap.size > 0) {
    const [sKey, sValue] = sMap.entries().next().value;

    for (let [tKey, tValue] of tMap) {
      if (sValue === tValue) {
        replaceMap[sKey] = tKey;
        sMap.delete(sKey);
        tMap.delete(tKey);
        break;
      }
    }
  }

  let replaced = '';
  for (let i = 0; i < size; i++) {
    replaced += replaceMap[s[i]];
  }

  return replaced === t;
};

console.log(isIsomorphic('abab', 'baba'));
