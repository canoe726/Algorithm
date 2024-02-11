from sys import stdin
from collections import deque
from itertools import combinations

answer = 0

maps = []

N, M = map(int, stdin.readline().rstrip().split())

for _ in range(N):
    nums = list(map(int, stdin.readline().rstrip().split()))
    maps.append(list(nums))

dirs = [(-1, 0), (0, -1), (1, 0), (0, 1)]
virus = []
wall_pos = []

for n in range(N):
    for m in range(M):
        wall_pos.append((n, m))

        if maps[n][m] == 2:
            virus.append((n, m))

combs = combinations(wall_pos, 3)

for comb in combs:
    cur_map = [[0] * M for _ in range(N)]
    valid = True
    for n in range(N):
        for m in range(M):
            cur_map[n][m] = maps[n][m]

    for pos in comb:
        n, m = pos
        if cur_map[n][m] != 0:
            valid = False
        cur_map[n][m] = 1

    if not valid:
        continue

    queue = deque(virus)

    while len(queue) > 0:
        vx, vy = queue.popleft()

        for dir in dirs:
            dx, dy = dir
            nx, ny = vx + dx, vy + dy

            if nx < 0 or nx >= N or ny < 0 or ny >= M:
                continue
            if cur_map[nx][ny] == 0:
                cur_map[nx][ny] = 2
                queue.append([nx, ny])

    safe_count = 0
    for n in range(N):
        for m in range(M):
            if cur_map[n][m] == 0:
                safe_count += 1

    answer = max(answer, safe_count)

    cur_map = None

print(answer)
