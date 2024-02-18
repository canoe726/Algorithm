from sys import stdin

INF = int(1e9)

N = list(map(int, stdin.readline().rstrip().split()))[0]
M = list(map(int, stdin.readline().rstrip().split()))[0]

distance = [[INF] * (N + 1) for _ in range(N + 1)]

for _ in range(M):
    a, b, c = list(map(int, stdin.readline().rstrip().split()))
    distance[a][b] = min(distance[a][b], c)

for i in range(N + 1):
    distance[i][i] = 0


for k in range(N + 1):
    for a in range(1, N + 1):
        for b in range(1, N + 1):
            distance[a][b] = min(distance[a][b], distance[a][k] + distance[k][b])

for i in range(1, N + 1):
    for j in range(1, N + 1):
        if distance[i][j] == INF:
            print(0, end=" ")
        else:
            print(distance[i][j], end=" ")
    print()
