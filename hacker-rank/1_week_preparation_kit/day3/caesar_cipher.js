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
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s, k) {
  // Write your code here
  const ciphers = [];
  const alphabetRegex = new RegExp(/[a-zA-Z]/);

  for (let i = 0; i < s.length; i++) {
    if (alphabetRegex.test(s[i])) {
      const code = s[i].charCodeAt();
      let nextCode = code;

      if (code >= 97) {
        nextCode = ((code - 97 + k) % 26) + 97;
      } else {
        nextCode = ((code - 65 + k) % 26) + 65;
      }
      ciphers.push(String.fromCharCode(nextCode));
    } else {
      ciphers.push(s[i]);
    }
  }

  return ciphers.join('');
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const s = readLine();

  const k = parseInt(readLine().trim(), 10);

  const result = caesarCipher(s, k);

  ws.write(result + '\n');

  ws.end();
}
