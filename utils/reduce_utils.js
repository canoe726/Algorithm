// 배열 또는 객체에서 값 환산
// #1
[1,2,3,4,5].reduce((acc, cur, idx, arr) => { return acc + cur; });

// #2-1
[{x:1},{x:2},{x:3},{x:4},{x:5}].reduce((acc, cur, idx, arr) => { return acc + cur.x; }, 0);

// #2-2
[{x:1},{x:2},{x:3},{x:4},{x:5}].filter(item => (item.x >= 3)).reduce((acc, cur, idx, arr) => { return acc + cur.x; }, 0);

// #3
[[1,2,3],[4,5,6],[7,8,9]].reduce((acc, cur, idx, arr) => { return acc.concat(cur.reduce((acc, cur, idx) => { return acc + cur; }, 0)); }, []);

// 배열에서 중복 원소 개수 세기
let alphabet = ['a', 'b', 'b', 'a', 'c', 'c', 'd', 'd', 'd', 'z', 'd', 'd', 'a'];
alphabet.reduce((acc, cur, idx, arr) => {
    if (cur in acc) {
        acc[cur]++;
    } else {
        acc[cur] = 1;
    }
    return acc;
}, {});

// 객체 키 기준으로 객체 재구성
let people = [{name: 'alice', age: 20}, {name: 'jin', age: 20}, {name: 'jake', age: 21}];

function groupBy(objArr, prop) {
    return objArr.reduce((acc, cur, idx, arr) => {
        const key = cur[prop];
        if (!acc[key]) acc[key] = [];
        acc[key].push(cur);
        return acc;
    }, {});
}

// 객체 배열에서 속성 연결하기
let friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

friends.reduce((acc, cur, idx, arr) => {
    return [...acc, ...cur.books];
}, []);

// Promise 순차 실행
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3;
}

function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

let promiseArr = [p1, p2, f3, p4];

function runPromiseInSequence(arr, input) {
    return arr.reduce((acc, cur, idx, arr) => {
        return acc.then(cur);
    }, Promise.resolve(input));
}

// runPromiseInSequence(promiseArr, 10).then(console.log);

// pipe 함수
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

const pipe = (...functions) => (input) => functions.reduce(
    (acc, cur, idx, arr) => {
        return cur(acc);
    }, input);

const multiply6 = pipe(double, triple);
multiply6(5) // 30

