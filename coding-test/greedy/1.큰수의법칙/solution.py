import sys
from functools import cmp_to_key

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

file = open(filePath + "/" + "input", "r")

N, M, K = map(int, file.readline().split())
nums = list(map(int, file.readline().split()))
nums.sort(reverse=True)

largest = nums[0]
secondLarge = nums[1]

answer = 0

while M > 0:
    for i in range(K):
        if M == 0:
            break
        answer += largest
        M -= 1

    if M == 0:
        break

    answer += secondLarge
    M -= 1

print(answer)

file.close()
