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
    index = None

    left = start
    right = end
    while left <= right:
        middle = (left + right) // 2

        if arr[middle] == target:
            index = middle
            break

        if arr[middle] > target:
            right = middle - 1
        else:
            left = middle + 1

    return index


answer = binarySearch(nums, M, 0, N - 1)

if answer == None:
    print("Not exist")
else:
    print(answer)

file.close()
