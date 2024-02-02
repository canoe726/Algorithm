from collections import deque
import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

N = list(map(int, file.readline().rstrip().split()))[0]
parts = list(map(int, file.readline().rstrip().split()))

M = list(map(int, file.readline().rstrip().split()))[0]
requires = list(map(int, file.readline().rstrip().split()))

parts.sort()


def binarySearch(arr, target, start, end):
    if start > end:
        return None

    left = start
    right = end
    middle = (left + right) // 2

    if arr[middle] == target:
        return middle

    if arr[middle] > target:
        return binarySearch(arr, target, left, middle - 1)
    else:
        return binarySearch(arr, target, middle + 1, right)


for require in requires:
    exist = binarySearch(parts, require, 0, len(parts) - 1)

    if exist != None:
        print("yes", end=" ")
    else:
        print("no", end=" ")


file.close()
