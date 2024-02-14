from sys import stdin
from collections import deque

answer = 0

N, L, R = list(map(int, stdin.readline().rstrip().split()))
peoples = []
for _ in range(N):
    row = list(map(int, stdin.readline().rstrip().split()))
    peoples.append(row)

dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def bfs(node, N, L, R, peoples, visited):
    x, y = node
    visited[(x, y)] = True
    queue = deque([(x, y)])
    union = [(x, y, peoples[x][y])]

    while queue:
        cx, cy = queue.popleft()

        for dir in dirs:
            dx, dy = dir
            nx, ny = cx + dx, cy + dy

            if nx < 0 or nx >= N or ny < 0 or ny >= N:
                continue
            if (nx, ny) in visited and visited[(nx, ny)]:
                continue

            diff = abs(peoples[cx][cy] - peoples[nx][ny])
            if diff >= L and diff <= R:
                visited[(nx, ny)] = True
                queue.append((nx, ny))
                union.append((nx, ny, peoples[nx][ny]))

    union_size = len(union)
    if union_size >= 2:
        people_count = map(lambda x: x[2], union)
        divided = sum(people_count) // union_size

        for u in union:
            x, y, _ = u
            peoples[x][y] = divided

        return 1
    else:
        return 0


visited = {}
answer = 0

while True:
    union_count = 0

    for x in range(N):
        for y in range(N):
            if not (x, y) in visited or not visited[(x, y)]:
                union_count += bfs((x, y), N, L, R, peoples, visited)

    if union_count == 0:
        break
    else:
        answer += 1
        visited = {}

print(answer)
