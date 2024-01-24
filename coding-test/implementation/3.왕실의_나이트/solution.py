import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline
file = open(filePath + "/" + "input", "r")

answer = 0

N, K = map(int, file.readline().split())
nums = list(map(int, file.readline().split()))

print(answer)
