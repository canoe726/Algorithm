function merge(arr, start, mid, end) {
  let sorted = Array(arr.length).fill(0);
  let left = start;
  let right = mid + 1;
  let idx = start;

  while (left <= mid && right <= end) {
    if (arr[left] <= arr[right]) {
      sorted[idx] = arr[left];
      left += 1;
    } else {
      sorted[idx] = arr[right];
      right += 1;
    }
    idx += 1;
  }

  if (left > mid) {
    for (let i = right; i < end + 1; i++) {
      sorted[idx] = arr[i];
      idx += 1;
    }
  } else {
    for (let i = left; i < mid + 1; i++) {
      sorted[idx] = arr[i];
      idx += 1;
    }
  }

  for (let i = start; i < end + 1; i++) {
    arr[i] = sorted[i];
  }
}

function mergeSort(arr, start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);

    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
}

// nums = [6, 1, -1, 7, 4, 0, 9, 2, 8, 5, 3];
// mergeSort(nums, 0, nums.length - 1);
// console.log(nums);
