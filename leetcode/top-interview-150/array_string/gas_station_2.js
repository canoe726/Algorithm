/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let size = gas.length;
  let total = 0;
  let acc = 0;
  let startAt = 0;

  for (let i = 0; i < size; i++) {
    let diff = gas[i] - cost[i];
    total += diff;
    acc += diff;

    if (acc < 0) {
      acc = 0;
      startAt = i + 1;
    }
  }

  if (total >= 0) {
    return startAt;
  }
  return -1;
};

console.log(canCompleteCircuit([4, 2, 3, 1, 5], [1, 4, 5, 3, 2]));
