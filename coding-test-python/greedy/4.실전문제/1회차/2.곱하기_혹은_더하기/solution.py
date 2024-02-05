import sys
from functools import cmp_to_key

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

answer = 0

file = open(filePath + "/" + "input", "r")

input = list(map(str, file.readline().split()))[0]
nums = list(map(int, input))

for num in nums:
    if num <= 1:
        answer += num
    else:
        answer *= num

print(answer)
