const nums = [1, 2, 3, 4, 5, 6, 7, 8];
const pickSize = 3;

function combination (nums, pickSize) {
  const comb = [];
  const visited = Array.from({ length: pickSize }, () => false);

  function getComb (index, pickedNums, pickedSize) {
    if (pickedSize == pickSize) {
      comb.push(pickedNums);
      return;
    }
    for (let i = index + 1; i < nums.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        getComb(i, pickedNums.concat(nums[i]), pickedSize + 1);
        visited[i] = false;
      }
    }
  }
  getComb(-1, [], 0);
  return comb;
}

const comb = combination(nums, pickSize);
console.log(comb);
console.log(comb.length);

