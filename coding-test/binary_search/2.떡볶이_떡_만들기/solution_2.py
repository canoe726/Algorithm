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


answer = -1
left = 0
right = max(cakes)

while left <= right:
    middle = (left + right) // 2
    cakeSize = getCakeSize(cakes, middle)

    if cakeSize >= M:
        answer = middle
        left = middle + 1
    else:
        right = middle - 1

print(answer)

file.close()
