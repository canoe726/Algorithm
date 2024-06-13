function getUnique(str) {
  let alpha = Array(26).fill(0);
  let result = '';

  for (let i = 0; i < str.length; i++) {
    alpha[str.charCodeAt(i) - 'a'.charCodeAt(0)] += 1;
  }

  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] > 0) {
      result += `${String.fromCharCode(i + 'a'.charCodeAt(0))}${alpha[i]}`;
    }
  }

  return result;
}

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const result = [];
  const word = new Map();

  for (let i = 0; i < strs.length; i++) {
    const unique = getUnique(strs[i]);

    if (!word.has(unique)) {
      word.set(unique, []);
    }
    word.get(unique).push(strs[i]);
  }

  for (let [_, value] of word) {
    result.push(value);
  }

  return result;
};

console.log(groupAnagrams(['d', 'az', 'b', 'd', 'za', 'a']));
