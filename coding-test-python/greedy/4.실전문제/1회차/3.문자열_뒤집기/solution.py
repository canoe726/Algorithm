import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

answer = [0, 0]

file = open(filePath + "/" + "input", "r")

input = list(map(str, file.readline().split()))[0]
nums = list(map(int, input))

INF = int(1e9)


for base in range(2):
    prevIndex = INF
    count = 0

    for i in range(len(nums)):
        if nums[i] != base and prevIndex == INF:
            prevIndex = i

        if nums[i] == base and prevIndex != INF:
            count += 1
            prevIndex = INF

    if prevIndex != INF:
        count += 1

    answer[base] = count

print(min(answer))
