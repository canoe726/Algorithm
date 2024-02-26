import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")
nums = list(map(int, file.readline().rstrip().split()))


def merge(arr, start, mid, end):
    sorted = [0 for _ in range(len(arr))]
    left = start
    right = mid + 1
    idx = start

    while left <= mid and right <= end:
        if arr[left] <= arr[right]:
            sorted[idx] = arr[left]
            left += 1
        else:
            sorted[idx] = arr[right]
            right += 1
        idx += 1

    if left > mid:
        for i in range(right, end + 1):
            sorted[idx] = arr[i]
            idx += 1
    else:
        for i in range(left, mid + 1):
            sorted[idx] = arr[i]
            idx += 1

    for i in range(start, end + 1):
        arr[i] = sorted[i]


def merge_sort(arr, start, end):
    if start < end:
        mid = (start + end) // 2

        merge_sort(arr, start, mid)
        merge_sort(arr, mid + 1, end)
        merge(arr, start, mid, end)


merge_sort(nums, 0, len(nums) - 1)
print(nums)

file.close()
