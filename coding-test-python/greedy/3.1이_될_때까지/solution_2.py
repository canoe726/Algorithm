import sys
from functools import cmp_to_key

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

answer = 0

file = open(filePath + "/" + "input", "r")

N, K = map(int, file.readline().split())

while True:
    minus = (N // K) * K
    N -= minus
    answer += minus

    if N < K:
        break

    N //= K
    answer += 1

answer += N - 1

print(answer)
