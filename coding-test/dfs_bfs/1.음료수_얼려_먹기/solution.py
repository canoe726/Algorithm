from collections import deque
import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

N, M = map(int, file.readline().rstrip().split())
iceCream = []
visited = [[False] * M for _ in range(N)]

for i in range(N):
    row = list(map(int, list(map(str, file.readline().rstrip().split()))[0]))
    iceCream.append(row)

# 상 우 하 좌
move = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def bfs(iceCream, visited, n, m, N, M):
    queue = deque([(n, m)])
    visited[n][m] = True

    while len(queue) > 0:
        curX, curY = queue.popleft()

        for mv in move:
            moveX, moveY = mv
            nextX, nextY = curX + moveX, curY + moveY

            if nextX < 0 or nextX >= N or nextY < 0 or nextY >= M:
                continue
            if iceCream[nextX][nextY] == 1:
                continue
            if visited[nextX][nextY]:
                continue

            queue.append((nextX, nextY))
            visited[nextX][nextY] = True


for n in range(N):
    for m in range(M):
        if iceCream[n][m] == 0 and not visited[n][m]:
            bfs(iceCream, visited, n, m, N, M)
            answer += 1


print(answer)

file.close()
