import sys
from functools import cmp_to_key

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

answer = 0

file = open(filePath + "/" + "input", "r")

N, K = map(int, file.readline().split())

while N > 1:
    if N % K == 0:
        N //= K
    else:
        N -= 1
    answer += 1

print(answer)
