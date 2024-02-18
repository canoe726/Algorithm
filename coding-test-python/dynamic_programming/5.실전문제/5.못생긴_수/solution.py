import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

N = list(map(int, file.readline().rstrip().split()))[0]

i2 = i3 = i5 = 0
next2, next3, next5 = 2, 3, 5
ugly = [0] * N
ugly[0] = 1

for i in range(1, N):
    ugly[i] = min(next2, next3, next5)

    if ugly[i] == next2:
        i2 += 1
        next2 = ugly[i2] * 2

    if ugly[i] == next3:
        i3 += 1
        next3 = ugly[i3] * 3

    if ugly[i] == next5:
        i5 += 1
        next5 = ugly[i5] * 5

print(ugly[-1])

file.close()
