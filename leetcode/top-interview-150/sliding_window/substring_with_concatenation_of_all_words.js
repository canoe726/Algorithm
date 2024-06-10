function splitChunk(s, size) {
  return s.match(new RegExp(`.{1,${size}}`, 'g'));
}

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const wordSize = words[0].length;
  const concatLen = words.reduce((acc, cur) => acc + cur, '').length;
  const counts = {};
  for (let i = 0; i < words.length; i++) {
    if (!counts[words[i]]) {
      counts[words[i]] = 1;
    } else {
      counts[words[i]] += 1;
    }
  }

  let answer = [];

  for (let i = 0; i <= s.length - concatLen; i++) {
    if (i - 1 >= 0 && s[i] === s[i - 1]) {
      continue;
    }

    let wordCount = words.length;
    const tempCounts = JSON.parse(JSON.stringify(counts));
    const sentence = s.slice(i, i + concatLen);
    const chunk = splitChunk(sentence, wordSize);
    let exist = true;

    console.log(i, tempCounts, chunk);

    for (let j = 0; j < chunk.length; j++) {
      if (tempCounts[chunk[j]] > 0) {
        wordCount -= 1;
      }
      tempCounts[chunk[j]] -= 1;
      if (tempCounts[chunk[j]] < 0) {
        exist = false;
        break;
      }
    }

    if (exist && wordCount === 0) {
      answer.push(i);
    }
  }

  return answer;
};

console.log(
  findSubstring('lingmindraboofooowingdingbarrwingmonkeypoundcake', [
    'fooo',
    'barr',
    'wing',
    'ding',
    'wing',
  ]),
);
