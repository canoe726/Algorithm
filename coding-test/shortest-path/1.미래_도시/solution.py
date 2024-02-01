import sys
from collections import deque


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
INF = int(1e9)

N, M = list(map(int, file.readline().rstrip().split()))
distance = [([INF] * N) for _ in range(N)]

for i in range(M):
    s, e = list(map(int, file.readline().rstrip().split()))
    start, end = s - 1, e - 1
    distance[start][end] = 1
    distance[end][start] = 1

X, K = list(map(int, file.readline().rstrip().split()))

for i in range(N):
    distance[i][i] = 0

for n in range(N):
    for i in range(N):
        for j in range(N):
            distance[i][j] = min(distance[i][j], distance[i][n] + distance[n][j])

answer = distance[0][K - 1] + distance[K - 1][X - 1]
if answer >= INF:
    print(-1)
else:
    print(answer)

file.close()
