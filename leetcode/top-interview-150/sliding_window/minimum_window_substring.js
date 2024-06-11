function isSame(cnt, iterCnt, tSize) {
  let count = 0;

  for (let [key, value] of cnt) {
    if (iterCnt.get(key) === value) {
      count += value;
    }
  }

  return count === tSize;
}

function setMap(map, word, add) {
  if (add === 1) {
    if (map.has()) {
      map.set(word, map.get(word) + 1);
    } else {
      map.set(word, 1);
    }
  }
  if (add === -1) {
    if (map.has() && map.get(word) > 0) {
      map.set(word, map.get(word) - 1);
    }
  }
}

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) {
    return '';
  }

  let cnt = new Map();
  let tSize = t.length;

  for (let i = 0; i < t.length; i++) {
    setMap(cnt, t[i], 1);
  }

  let lastIdx = [];
  let answer = '';
  let size = 987654312;
  let iterCnt = new Map();
  let start = 0;
  let end = 0;

  console.log('cnt: ', cnt);
  for (let i = 0; i < s.length; i++) {
    if (start === end) {
      setMap(iterCnt, s[start], 1);
      lastIdx.push(i);
    }

    if (isSame(cnt, iterCnt, tSize)) {
      console.log('isSame: ', iterCnt, '\n');
      let windowSize = end - start + 1;

      if (windowSize < size) {
        size = windowSize;
        answer = s.slice(start, start + size);
      }

      setMap(iterCnt, s[start], -1);
      start = lastIdx.shift();
    }

    setMap(iterCnt, s[end], 1);
    if (cnt.has(s[end])) {
      lastIdx.push(end);
    }

    console.log(
      '\n',
      `case[${i}] : start: ${start}, end: ${end}, answer: ${answer}, size: ${size}\n`,
      lastIdx,
      iterCnt,
    );

    end += 1;
  }

  return answer;
};

console.log(minWindow('ADOBECODEBANC', 'ABC'));
