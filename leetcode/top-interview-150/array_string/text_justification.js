function sum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

function evenify(words, start, end, maxWidth, isLast) {
  let myWords = words.slice(start, end).join(' ');
  const padSize = maxWidth - myWords.length;
  const wordCount = end - start;

  if (isLast || wordCount === 1) {
    let space = ' '.repeat(padSize);
    return `${myWords}${space}`;
  }

  if (myWords.length < maxWidth) {
    const spaceCount = wordCount - 1;
    const evenSpace = Math.floor(padSize / spaceCount);
    const evenSpaceList = Array(spaceCount).fill(evenSpace);

    let index = 0;
    while (padSize > sum(evenSpaceList)) {
      evenSpaceList[index] += 1;
      index += 1;
      if (index >= evenSpaceList.length) {
        index = 0;
      }
    }

    let justifyWords = words.slice(start, end);
    justifyWords = justifyWords.map((word, index) => {
      const spaceSize = evenSpaceList[index];
      const spaces = ' '.repeat(spaceSize + 1);
      return `${word}${spaces}`;
    });

    return justifyWords.join('');
  }

  return myWords;
}

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  let total = 0;
  let start = -1;
  let answer = [];

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    total += word.length;

    if (start === -1) {
      start = i;
    }

    if (total === maxWidth) {
      answer.push(evenify(words, start, i + 1, maxWidth, false));
      start = -1;
      total = 0;
    } else if (total > maxWidth) {
      answer.push(evenify(words, start, i, maxWidth, false));
      start = -1;

      total = 0;
      i -= 1;
    } else {
      // pad space
      total += 1;
    }
  }

  if (start >= 0) {
    answer.push(evenify(words, start, words.length, maxWidth, true));
  }

  return answer;
};

console.log(
  fullJustify(
    [
      'Science',
      'is',
      'what',
      'we',
      'understand',
      'well',
      'enough',
      'to',
      'explain',
      'to',
      'a',
      'computer.',
      'Art',
      'is',
      'everything',
      'else',
      'we',
      'do',
    ],
    20,
  ),
);
