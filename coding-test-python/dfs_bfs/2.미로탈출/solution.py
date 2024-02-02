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
maze = []
visited = [[False] * M for _ in range(N)]

for i in range(N):
    row = list(map(int, list(map(str, file.readline().rstrip().split()))[0]))
    maze.append(row)


# 상 우 하 좌
move = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def bfs(maze, visited, n, m, N, M):
    minCount = 0
    queue = deque([(n, m, 1)])
    visited[n][m] = True

    while len(queue) > 0:
        curX, curY, count = queue.popleft()

        if curX == N - 1 and curY == M - 1:
            minCount = count
            break

        for mv in move:
            moveX, moveY = mv
            nextX, nextY = curX + moveX, curY + moveY

            if nextX < 0 or nextX >= N or nextY < 0 or nextY >= M:
                continue
            if maze[nextX][nextY] == 0:
                continue
            if visited[nextX][nextY]:
                continue

            queue.append((nextX, nextY, count + 1))
            visited[nextX][nextY] = True

    return minCount


answer = bfs(maze, visited, 0, 0, N, M)

print(answer)

file.close()
