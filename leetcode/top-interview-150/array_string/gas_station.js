/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let size = gas.length;
  let sum = new Array(size * 2).fill(0);

  for (let i = 0; i < size; i++) {
    let diff = gas[i] - cost[i];
    sum[i] = diff;
    sum[i + size] = diff;
  }

  let acc = 0;
  let cnt = 0;
  let result = -1;

  for (let i = 0; i < 2 * size - 1; i++) {
    if (sum[i] < 0 && cnt == 0) {
      continue;
    }

    if (sum[i] >= 0 && result == -1) {
      acc = sum[i];
      result = i;
      cnt = 1;
      if (result >= size) {
        result = -1;
        break;
      }
    } else {
      acc += sum[i];
      cnt += 1;

      if (acc < 0) {
        acc = 0;
        cnt = 0;
        result = -1;
        i -= 1;
        continue;
      }

      if (cnt == size) {
        break;
      }
    }
  }

  return result;
};

console.log(canCompleteCircuit([4, 2, 3, 1, 5], [1, 4, 5, 3, 2]));
