from sys import stdin

answer = 0

maps = []

N, M = map(int, stdin.readline().rstrip().split())

for _ in range(N):
    nums = list(map(int, stdin.readline().rstrip().split()))
    maps.append(list(nums))

temp = [[0] * M for _ in range(N)]
dirs = [(-1, 0), (0, -1), (1, 0), (0, 1)]


def get_score():
    score = 0
    for i in range(N):
        for j in range(M):
            if temp[i][j] == 0:
                score += 1

    return score


def virus(x, y):
    for dir in dirs:
        dx, dy = dir
        nx, ny = x + dx, y + dy

        if nx < 0 or nx >= N or ny < 0 or ny >= M:
            continue
        if temp[nx][ny] == 0:
            temp[nx][ny] = 2
            virus(nx, ny)


def dfs(count):
    global answer

    if count == 3:
        for i in range(N):
            for j in range(M):
                temp[i][j] = maps[i][j]

        for i in range(N):
            for j in range(M):
                if temp[i][j] == 2:
                    virus(i, j)

        answer = max(answer, get_score())
        return

    for i in range(N):
        for j in range(M):
            if maps[i][j] == 0:
                maps[i][j] = 1
                count += 1
                dfs(count)
                maps[i][j] = 0
                count -= 1


dfs(0)

print(answer)
