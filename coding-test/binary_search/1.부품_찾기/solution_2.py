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
parts = set(map(int, file.readline().rstrip().split()))

M = list(map(int, file.readline().rstrip().split()))[0]
requires = list(map(int, file.readline().rstrip().split()))


for require in requires:
    if require in parts:
        print("yes", end=" ")
    else:
        print("no", end=" ")

file.close()
