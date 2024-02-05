import sys
from functools import cmp_to_key

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

answer = 0

file = open(filePath + "/" + "input", "r")

N = list(map(int, file.readline().split()))[0]

nums = list(map(int, file.readline().split()))
nums.sort()

count = 0

for num in nums:
    count += 1

    if count >= num:
        count = 0
        answer += 1

print(answer)
