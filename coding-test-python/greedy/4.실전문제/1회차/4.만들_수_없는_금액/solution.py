import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
input = list(map(int, file.readline().split()))[0]
nums = list(map(int, file.readline().split()))
nums.sort()

target = 1

for n in nums:
    if target < n:
        break
    target += n

print(target)

file.close()
