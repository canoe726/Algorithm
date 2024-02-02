// 문자열의 중복을 체크하는 방법
// 중복이면 true, 그렇지 않으면 false
const str1 = 'a-x_AcbpdoZDau.QlZC,kq[we+';
const str2 = 'abcdefghijklmnopqrs';

// 1. 자료구조를 사용하는 방법
// 1-1. new Set
const solution1 = (str) => {
  const set = [...new Set(str.split(''))];
  return set.length === str.length;
}
// console.log(solution1(str1));
// console.log(solution1(str2));

// 1-2. array
// 배열 크기 : ascii : 128, unicode : 65536
const solution2 = (str) => {
  let duplicate = false;
  let ascii = Array.from({ length: 65536 }, () => 0);
  for (let i = 0; i < str.length; i++) {
    const codeId = str.charAt(i).charCodeAt() - 'a'.charCodeAt();
    ascii[codeId] += 1;
    if (ascii[codeId] > 1) {
      duplicate = true;
      break;
    }
  }
  return duplicate;
}
// console.log(solution2(str1));
// console.log(solution2(str2));

// 1-3. array-2
// 비트 연산
// 범위는 a-z
const solution3 = (str) => {
  let checker = 0;
  for (let i = 0; i < str.length; i++) {
    const codeId = str.charAt(i).charCodeAt() - 'a'.charCodeAt();
    // codeId 는 2의 제곱승으로 계속 증가하므로 찾을 수 있다
    if ((checker & (1 << codeId)) > 0) {
      return true;
    }
    checker |= (1 << codeId);
  }
  return false;
}
// console.log(solution3('abcdefghijklmnopqrstuvwxyzab'));
// console.log(solution3(str2));

// 2. 자료구조를 사용하지 않는 방법
// 2-1. 2차원 반복 / 시간복잡도 : O(n^2)
const solution4 = (str) => {
  const arrStr = str.split('');
  for (let i = 0; i < str.length - 2; i++) {
    for (let j = i + 1; j < str.length - 1; j++) {
      if (arrStr[i] === arrStr[j]) {
        return true;
      }
    }
  }
  return false;
}
// console.log(solution4(str1));
// console.log(solution4(str2));

// 2-2. 문자열 정렬 후 인접문자 비교 / 시간복잡도 : 정렬알고리즘에 따라 상이
const solution5 = (str) => {
  const arrStr = str.split('');
  const sorted = arrStr.sort();
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] === sorted[i + 1]) {
      return true;
    }
  }
  return false;
}
// console.log(solution5(str1));
// console.log(solution5(str2));
