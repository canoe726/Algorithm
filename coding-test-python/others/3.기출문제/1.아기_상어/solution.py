from sys import stdin
import heapq
from collections import deque


answer = 0

N = list(map(int, stdin.readline().rstrip().split()))[0]
maps = []

dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]
shark = {
    "x": -1,
    "y": -1,
    "size": 2,
    "count": 0,
}
fish = 0
timer = 0

for i in range(N):
    row = list(map(int, stdin.readline().rstrip().split()))
    maps.append(row)

    for j in range(N):
        if row[j] == 9:
            shark["x"] = i
            shark["y"] = j
        if row[j] != 0:
            fish += 1


def bfs(shark, maps, queue):
    visited = [[False] * N for _ in range(N)]

    sx, sy, s_size = shark["x"], shark["y"], shark["size"]
    deq = deque([])

    deq.append((sx, sy, 0))
    visited[sx][sy] = True

    while deq:
        x, y, dist = deq.popleft()

        if maps[x][y] >= 1 and maps[x][y] <= 6:
            heapq.heappush(queue, (dist, x, y, maps[x][y]))

        for dir in dirs:
            dx, dy = dir
            nx, ny = x + dx, y + dy

            if nx < 0 or nx >= N or ny < 0 or ny >= N:
                continue
            if visited[nx][ny]:
                continue
            if maps[nx][ny] > s_size:
                continue

            deq.append((nx, ny, dist + 1))
            visited[nx][ny] = True


while fish > 0:
    queue = []
    # 도달할 수 있는 물고기 거리 찾기
    bfs(shark, maps, queue)

    if len(queue) == 0:
        break
    else:
        eat_something = False

        while queue:
            dist, x, y, size = heapq.heappop(queue)

            # 잡아먹기
            if shark["size"] > size:
                eat_something = True
                maps[shark["x"]][shark["y"]] = 0
                shark["x"], shark["y"] = x, y
                maps[x][y] = 9
                shark["count"] += 1
                fish -= 1
                timer += dist

                # 크기증가
                if shark["count"] >= shark["size"]:
                    shark["size"] += 1
                    shark["count"] = 0
                break

        if not eat_something:
            break


print(timer)
