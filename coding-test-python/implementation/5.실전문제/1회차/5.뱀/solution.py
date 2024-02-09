import sys
from collections import deque


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
apples = []
snakes = deque([])
turns = deque([])

N = list(map(int, file.readline().strip().split()))[0]
K = list(map(int, file.readline().strip().split()))[0]

for _ in range(K):
    pos = list(map(int, file.readline().strip().split()))
    apples.append(pos)

L = list(map(int, file.readline().strip().split()))[0]
for _ in range(L):
    shifts = list(map(str, file.readline().strip().split()))
    turns.append(shifts)


# 사과 = 2, 뱀 = 1, 빈 공간 = 0
maps = [[0] * N for _ in range(N)]
cur_dir = 0
dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]


for apple in apples:
    ax, ay = apple
    maps[ax - 1][ay - 1] = 2


def get_next_dir(cur_dir, next_dir):
    if next_dir == "L":
        n = cur_dir - 1
        if n < 0:
            n = len(dirs) - 1
        return n
    else:
        n = cur_dir + 1
        if n >= len(dirs):
            n = 0
        return n


answer = 0
snakes.append([0, 0])
maps[0][0] = 1


while True:
    if len(turns) > 0:
        snake_first = turns[0]
        timer, rotate_dir = turns[0]
        if answer == int(timer):
            cur_dir = get_next_dir(cur_dir, rotate_dir)
            turns.popleft()

    dx, dy = dirs[cur_dir]
    head = snakes[len(snakes) - 1]

    hx, hy = head
    nx, ny = hx + dx, hy + dy
    answer += 1

    # 벽에 부딪힌 경우
    if nx < 0 or nx >= N or ny < 0 or ny >= N:
        break
    # 자기 자신과 부딪힌 경우
    if maps[nx][ny] == 1:
        break

    if maps[nx][ny] == 2:
        maps[nx][ny] = 1

        snakes.append([nx, ny])
    else:
        maps[nx][ny] = 1

        snakes.append([nx, ny])
        tail = snakes.popleft()
        tx, ty = tail
        maps[tx][ty] = 0


print(answer)

file.close()
