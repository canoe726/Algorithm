import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")
nums = list(map(int, file.readline().rstrip().split()))


# Hoare 분할 방식
# 평균 O(N * logN), 최악 O(N^2)
def quickSort(arr, start, end):
    if start >= end:
        return

    pivot = start
    left = pivot + 1
    right = end

    while left <= right:
        while left <= end and arr[pivot] > arr[left]:
            left += 1
        while right > start and arr[pivot] < arr[right]:
            right -= 1

        if left <= right:
            arr[left], arr[right] = arr[right], arr[left]
        else:
            arr[right], arr[pivot] = arr[pivot], arr[right]

    quickSort(arr, start, right - 1)
    quickSort(arr, right + 1, end)


quickSort(nums, 0, len(nums) - 1)
print(nums)

file.close()
