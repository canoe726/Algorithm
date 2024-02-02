import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
nums = []

N = list(map(int, file.readline().rstrip().split()))[0]
for i in range(N):
    num = list(map(int, file.readline().rstrip().split()))[0]
    nums.append(num)

sortedNums = sorted(nums, reverse=True)

for i in range(len(sortedNums)):
    if i == len(sortedNums) - 1:
        print(sortedNums[i], end="")
    else:
        print(sortedNums[i], "", end="")

file.close()
