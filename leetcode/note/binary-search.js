function binarySearch(arr, target, start, end) {
  arr.sort();
  let index = null;

  let left = start;
  let right = end;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      index = mid;
      break;
    }

    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return index;
}

arr = [4, 0, 3, 5, 2, 9, 1, 8, 6, 7];
console.log(binarySearch(arr, 3, 0, arr.length - 1));
