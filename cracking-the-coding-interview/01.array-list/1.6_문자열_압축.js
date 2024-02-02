// 문자열 압축
// 문자열은 a-z
const str1 = 'aabcccccaaa';
const answer1 = 'a2b1c5a3';
const str2 = 'aaabbbbbccccddddefff'
const answer2 = 'a3b5c4d4e1f3';
const str3 = 'abc';
const answer3 = 'abc';

// 1.
const solution1 = (str) => {
  let compressed = '';
  const arrStr = str.split('');
  let cnt = 1;
  let base = arrStr[0];
  for (let i = 1; i < arrStr.length; i++) {
    if (base === arrStr[i]) {
      cnt += 1;
    } else {
      compressed += `${base}${cnt}`;
      base = arrStr[i];
      cnt = 1;
    }
  }
  compressed += `${base}${cnt}`;
  return compressed.length > str.length ? str : compressed;
}
// console.log(solution1(str1) === answer1);
// console.log(solution1(str2) === answer2);
// console.log(solution1(str3) === answer3);

// 2. 미리 압축 문자열의 길이를 알 수 있다면 문자열 연산을 하지 않아도 되는 경우가 있다.
const solution2 = (str) => {
  const finalLength = countCompressed(str);
  if (finalLength > str.length) {
    return str;
  }
  let compressed = '';
  const arrStr = str.split('');
  let cnt = 1;
  let base = arrStr[0];
  for (let i = 1; i < arrStr.length; i++) {
    if (base === arrStr[i]) {
      cnt += 1;
    } else {
      compressed += `${base}${cnt}`;
      base = arrStr[i];
      cnt = 1;
    }
  }
  compressed += `${base}${cnt}`;
  return compressed;
}

const countCompressed = (str) => {
  let compressedLength = 0;
  const arrStr = str.split('');
  let cnt = 1;
  let base = arrStr[0];
  for (let i = 1; i < arrStr.length; i++) {
    if (base === arrStr[i]) {
      cnt += 1;
    } else {
      compressedLength += 2;
      base = arrStr[i];
      cnt = 1;
    }
  }
  compressedLength += 2;
  return compressedLength;
}
console.log(solution2(str1) === answer1);
console.log(solution2(str2) === answer2);
console.log(solution2(str3) === answer3);
