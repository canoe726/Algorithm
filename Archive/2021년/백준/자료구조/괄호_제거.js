let fs = require('fs');
// /dev/stdin
let input = fs.readFileSync('괄호_제거.input').toString().trim();

const visited = Array.from({ length: input.length }, () => true);

let answer = [];
const pList = [];
const stack = [];
for (let i = 0; i < input.length; i++) {
  const ch = input.charAt(i);
  if (ch == '(') {
    stack.push(i);
  } else if (ch == ')') {
    const top = stack.pop();
    pList.push([top, i]);
  }
}
function search(idx, cnt, size) {
  if (idx == size) {
    if (cnt > 0) {
      let str = [];
      for (let i = 0; i < visited.length; i++) {
        if (visited[i]) {
          str.push(input.charAt(i));
        }
      }
      answer.push(str.join(''));
    }
  }

  for (let i = idx; i < pList.length; i++) {
    search(i + 1, cnt, size);

    visited[pList[i][0]] = false;
    visited[pList[i][1]] = false;
    search(i + 1, cnt + 1, size);
    visited[pList[i][0]] = true;
    visited[pList[i][1]] = true;
  }
}
search(0, 0, pList.length);
answer = [...new Set(answer)];
answer.sort()
for (let i = 0; i < answer.length; i++) {
  console.log(answer[i]);
}
