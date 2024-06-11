function isContain(counts, sentence, wordSize) {
  let wordCounts = new Map();

  for (let i = 0; i < sentence.length; i += wordSize) {
    const word = sentence.slice(i, i + wordSize);

    if (wordCounts.has(word)) {
      wordCounts.set(word, wordCounts.get(word) + 1);
    } else {
      wordCounts.set(word, 1);
    }
  }

  for (let [key, value] of counts) {
    if (wordCounts.get(key) !== value) {
      return false;
    }
  }
  return true;
}

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const wordSize = words[0].length;
  const concatLen = words.reduce((acc, cur) => acc + cur, '').length;
  const counts = new Map();
  let answer = [];

  for (let i = 0; i < words.length; i++) {
    if (counts.has(words[i])) {
      counts.set(words[i], counts.get(words[i]) + 1);
    } else {
      counts.set(words[i], 1);
    }
  }

  for (let i = 0; i <= s.length - concatLen; i++) {
    const sentence = s.slice(i, i + concatLen);

    if (isContain(counts, sentence, wordSize)) {
      answer.push(i);
    }
  }

  return answer;
};

console.log(findSubstring('barfoothefoobarman', ['foo', 'bar']));
