'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function Node(value) {
  let data = value;
  let next = null;

  return { data, next };
}

function Stack() {
  let stack = null;
  let last = null;

  function top() {
    if (stack === null) {
      return null;
    }
    if (stack.next === null) {
      return stack.data;
    }
    return last.data;
  }

  function push(data) {
    const newNode = Node(data);
    if (stack === null) {
      stack = newNode;
      return;
    }

    let temp = stack;
    while (temp.next) {
      temp = temp.next;
    }
    temp.next = newNode;
    last = temp.next;
  }

  function pop() {
    if (stack === null) {
      return null;
    }
    if (stack.next === null) {
      const popData = stack.data;
      stack = null;
      return popData;
    }

    let prev = null;
    let temp = stack;
    while (temp.next) {
      prev = temp;
      temp = temp.next;
    }
    const popData = temp.data;
    prev.next = null;
    last = prev;

    return popData;
  }

  return {
    top,
    push,
    pop,
  };
}

function isBalanced(s) {
  const size = s.length;
  if (size % 2 === 1) {
    return 'NO';
  }

  const stack = Stack();
  for (let i = 0; i < size; i++) {
    const ch = s[i];

    if (ch === '{' || ch === '(' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.top() === null) {
        return 'NO';
      }

      const popData = stack.pop();
      if (
        (popData === '{' && ch === '}') ||
        (popData === '[' && ch === ']') ||
        (popData === '(' && ch === ')')
      ) {
        continue;
      } else {
        return 'NO';
      }
    }
  }

  if (stack.top() === null) {
    return 'YES';
  }

  return 'NO';
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const s = readLine();

    const result = isBalanced(s);

    ws.write(result + '\n');
  }

  ws.end();
}
