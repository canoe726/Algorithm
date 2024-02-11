from sys import stdin
from collections import deque

answer = 0

N, K = map(int, stdin.readline().rstrip().split())
maps = []

for _ in range(N):
    row = list(map(int, stdin.readline().rstrip().split()))
    maps.append(row)

S, X, Y = map(int, stdin.readline().rstrip().split())

dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]
v = []

for i in range(N):
    for j in range(N):
        if maps[i][j] != 0:
            v.append((maps[i][j], 0, i, j))

virus = deque(sorted(v))

while virus:
    v_size, time, x, y = virus.popleft()

    if time == S:
        break

    for dir in dirs:
        dx, dy = dir
        nx, ny = dx + x, dy + y

        if nx < 0 or nx >= N or ny < 0 or ny >= N:
            continue
        if maps[nx][ny] == 0:
            maps[nx][ny] = v_size
            virus.append((v_size, time + 1, nx, ny))

print(maps[X - 1][Y - 1])
