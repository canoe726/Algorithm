import sys
import heapq
from collections import deque


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

heap = []
heapq.heappush(heap, 1)

N, M = map(int, file.readline().rstrip().split())
balls = list(map(int, file.readline().rstrip().split()))

print(min((3, 2), (2, 1)))

file.close()
