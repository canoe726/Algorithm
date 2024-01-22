const fs = require('fs');
const path = require('path');

const [args, n, ...arr] = fs
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : path.resolve(__dirname, 'input'))
  .toString()
  .trim()
  .split('\n');

const [length, width, height] = args.split(' ');

function comp(a, b) {
  return a - b;
}

function main(l, w, h, N, arr) {
  const lwh = [l, w, h].sort(comp);
  const [width, height, length] = lwh;
  let answer = 0;

  const masterCubes = [[[width, height, length], 1]];

  const cubes = [];
  for (let i = 0; i < N; i++) {
    const [size, count] = arr[i];
    const s = Math.pow(2, size);
    cubes.push([[s, s, 1], count * s]);
  }

  console.log(cubes);
  let index = 0;

  while (masterCubes.length > 0 || cubes.length > 0) {
    const [[mw, mh, ml], mc] = masterCubes[0];
    const [[w, h, l], c] = cubes[cubes.length - 1];

    if (mw >= w && mh >= h) {
      const divides = [
        [[w, h, 1], ml * mc],
        [[mw - w, mh, 1], ml * mc],
        [[mw, mh - h, 1], ml * mc],
        [[mw - w, mh - h, 1], ml * mc],
      ];

      for (let i = 0; i < 4; i++) {
        const [[dw, dh, dl], dc] = divides[i];

        if (dw === 0 || dh === 0) {
          continue;
        }

        if (dw === w && dh === h) {
        } else {
          masterCubes.push(divides[i]);
        }
      }

      console.log('divides : ', divides);
    } else {
      cubes.pop();
      continue;
    }

    if (c === 0) {
      cubes.pop();
    }

    index += 1;
    if (index === 1) {
      break;
    }
  }

  console.log(cubes);

  return answer;
}

const response = main(
  Number(length),
  Number(width),
  Number(height),
  Number(n),
  arr.map((a) => a.split(' ').map((a) => Number(a))),
);
console.log(response);
