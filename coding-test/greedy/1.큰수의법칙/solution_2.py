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
# 가장 큰 수가 나오는 횟수
count = int(M / (K + 1)) * K
count += M % (K + 1)

answer += count * largest
answer += (M - count) * secondLarge

print(answer)

file.close()
