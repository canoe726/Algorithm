import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

INF = int(1e9)
answer = 0

N, M = map(int, file.readline().rstrip().split())
distance = [[INF] * (N + 1) for _ in range(N + 1)]

for _ in range(M):
    a, b = list(map(int, file.readline().rstrip().split()))
    distance[a][b] = 1

for i in range(1, N + 1):
    distance[i][i] = 0

for k in range(1, N + 1):
    for a in range(1, N + 1):
        for b in range(1, N + 1):
            distance[a][b] = min(distance[a][b], distance[a][k] + distance[k][b])

for i in range(1, N + 1):
    count = 0

    for j in range(1, N + 1):
        if distance[i][j] != INF or distance[j][i] != INF:
            count += 1

    if count == N:
        answer += 1

for d in distance:
    print(d)

print(answer)

file.close()
