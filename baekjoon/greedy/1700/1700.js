const [n, ...arr] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
  .toString()
  .trim()
  .split('\n');
const [N, K] = n.split(' ');

function main(N, K, arr) {
  const MAX_VALUE = 987654321;
  let answer = 0;
  let multitap = [];

  for (let i = 0; i < K; i++) {
    const appliance = arr[i];

    if (multitap.indexOf(appliance) >= 0) {
      continue;
    }
    if (multitap.length < N) {
      multitap.push(appliance);
      continue;
    }

    const existList = [];
    for (let mIndex = 0; mIndex < multitap.length; mIndex++) {
      const leftList = arr.slice(i + 1);

      const item = multitap[mIndex];
      const index = leftList.indexOf(item);
      const count = leftList.filter((i) => i === item).length;

      existList.push({ item, index: index === -1 ? MAX_VALUE : index, count });
    }
    existList.sort((a, b) => {
      if (a.index === b.index) {
        if (a.count === b.count) {
          return a.item - b.item;
        }
        return a.count - b.count;
      }
      return b.index - a.index;
    });
    const removeIndex = multitap.indexOf(existList[0].item);
    multitap = [...multitap.slice(0, removeIndex), ...multitap.slice(removeIndex + 1)];
    multitap.push(appliance);

    answer += 1;
  }

  return answer;
}

const response = main(
  Number(N),
  Number(K),
  arr[0].split(' ').map((a) => Number(a)),
);
console.log(response);
