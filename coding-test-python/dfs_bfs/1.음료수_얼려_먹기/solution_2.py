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
maps = []

for _ in range(N):
    row = list(map(int, list(map(str, file.readline().rstrip().split()[0]))))
    maps.append(row)

dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def dfs(maps, x, y):
    maps[x][y] = 1

    for dir in dirs:
        dx, dy = dir
        nx, ny = dx + x, dy + y

        if nx < 0 or nx >= N or ny < 0 or ny >= M:
            continue
        if maps[nx][ny] == 0:
            dfs(maps, nx, ny)


for i in range(N):
    for j in range(M):
        if maps[i][j] == 0:
            dfs(maps, i, j)
            answer += 1


print(answer)

file.close()
