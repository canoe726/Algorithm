const nums = [1, 2, 3, 4, 5, 6, 7];
const pickSize = 3;

function permutation (nums, pickSize) {
  const perm = [];
  const size = nums.length;
  const visited = Array.from({ length: size }, () => false);

  function findPerm (pick, picked) {
    if (picked == pickSize) {
      perm.push(pick);
      return;
    }
    for (let i = 0; i < size; i++) {
      if (!visited[i]) {
        visited[i] = true;
        findPerm(pick.concat(nums[i]), picked + 1);
        visited[i] = false;
      }
    }
  }
  findPerm([], 0);
  return perm;
}

const perm = permutation(nums, pickSize);
console.log(perm);
console.log(perm.length);