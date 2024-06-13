/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const sortedStrs = strs
    .map((str, index) => {
      return [str.split('').sort().join(''), index];
    })
    .sort();

  const answer = [];

  let i;
  let temp = [];
  for (i = 0; i < sortedStrs.length - 1; i++) {
    if (sortedStrs[i][0] !== sortedStrs[i + 1][0]) {
      temp.push(strs[sortedStrs[i][1]]);
      answer.push(temp);
      temp = [];
    } else {
      temp.push(strs[sortedStrs[i][1]]);
    }
  }

  if (i - 1 >= 0) {
    if (sortedStrs[i - 1][0] !== sortedStrs[i][0]) {
      answer.push([strs[sortedStrs[i][1]]]);
    } else {
      temp.push(strs[sortedStrs[i][1]]);
      answer.push(temp);
    }
  } else {
    answer.push(strs);
  }

  return answer;
};

console.log(groupAnagrams([' ', 'a', '', 'a', 'a']));
