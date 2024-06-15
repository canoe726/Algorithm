function binarySearchLowerBound(arr, target, start, end) {
  arr.sort();
  const INF = 987654321;
  let index = INF;

  let left = start;
  let right = end;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
      continue;
    }

    index = Math.min(index, mid);
    right = mid - 1;
  }

  if (index === INF) {
    index = Math.min(index, left - 1);
  }

  return index;
}

arr = [1, 1, 3, 3, 3, 4, 4, 5];
console.log(binarySearchLowerBound(arr, 2, 0, arr.length - 1));
