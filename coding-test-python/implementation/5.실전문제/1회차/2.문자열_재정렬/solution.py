import sys
import heapq


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
queue = []

inputs = list(map(str, file.readline().rstrip().split()))[0]
strings = list(inputs)

alphabets = []
sum = 0

for s in strings:
    s_code = ord(s)
    if s_code >= ord("A") and s_code <= ord("Z"):
        alphabets.append(s)
    else:
        sum += int(s)

alphabets.sort()

answer = "".join(alphabets) + str(sum)

print(answer)

file.close()
