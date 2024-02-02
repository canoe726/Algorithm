from collections import deque
import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

N, M = list(map(int, file.readline().rstrip().split()))
cakes = list(map(int, file.readline().rstrip().split()))


def getCakeSize(cakes, cut_size):
    total = 0
    for cake in cakes:
        diff = cake - cut_size
        if diff > 0:
            total += diff
    return total


def binarySearch(answer, cakes, target, start, end):
    if start > end:
        return

    left = start
    right = end
    middle = (left + right) // 2

    cakeSize = getCakeSize(cakes, middle)
    print(middle, (cakeSize))

    if cakeSize >= target:
        if answer[0] < middle:
            answer[0] = middle

    if cakeSize >= target:
        binarySearch(answer, cakes, target, middle + 1, right)
    else:
        binarySearch(answer, cakes, target, left, middle - 1)


answer = [-1]

binarySearch(answer, cakes, M, 0, max(cakes))


file.close()
