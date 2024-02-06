import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
N, M = list(map(int, file.readline().split()))
nums = list(map(int, file.readline().split()))
nums.sort()

balls = [0] * 11

for num in nums:
    balls[num] += 1

for i in range(1, M + 1):
    N -= balls[i]
    answer += N * balls[i]

print(answer)

file.close()
