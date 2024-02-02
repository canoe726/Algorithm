import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")
N, M = list(map(int, file.readline().rstrip().split()))

nums = list(map(int, file.readline().rstrip().split()))
nums.sort()


def binarySearch(arr, target, start, end):
    if start > end:
        return None

    left = start
    right = end
    middle = (left + right) // 2

    if arr[middle] == target:
        return middle

    if arr[middle] > target:
        return binarySearch(arr, target, start, middle - 1)
    else:
        return binarySearch(arr, target, middle + 1, end)


answer = binarySearch(nums, M, 0, N - 1)

if answer == None:
    print("Not exist")
else:
    print(answer)

file.close()
