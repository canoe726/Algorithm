function permutation(arr, r) {
  arr.sort();
  let used = Array(arr.length).fill(false);
  let result = [];

  function generate(chosen, used) {
    if (chosen.length === r) {
      result.push([...chosen]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!used[i] && (i === 0 || arr[i - 1] !== arr[i] || used[i - 1])) {
        chosen.push(arr[i]);
        used[i] = true;
        generate(chosen, used);
        used[i] = false;
        chosen.pop();
      }
    }
  }

  generate([], used);
  return result;
}
