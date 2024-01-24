import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline
file = open(filePath + "/" + "input", "r")

answer = 0

move = {
    0: (-1, 0),
    1: (0, 1),
    2: (1, 0),
    3: (0, -1),
}

N, M = map(int, file.readline().split())
X, Y, D = map(int, file.readline().split())
maps = []
visited = [[False] * N for i in range(M)]

for i in range(N):
    row = list(map(int, file.readline().split()))
    maps.append(row)

myX, myY, direction = X, Y, D

visited[myX][myY] = True
answer += 1
turn_time = 0


def turn_left():
    global direction
    direction -= 1
    if direction == -1:
        direction = 3


while True:
    turn_left()
    moveX, moveY = move[direction]
    nx, ny = myX + moveX, myY + moveY

    if visited[nx][ny] == False and maps[nx][ny] == 0:
        myX, myY = nx, ny
        visited[myX][myY] = True
        answer += 1
        turn_time = 0
        continue
    else:
        turn_time += 1

    if turn_time == 4:
        nx, ny = myX - moveX, myY - moveY

        if maps[nx][ny] == 0:
            myX, myY = nx, ny
        else:
            break
        turn_time = 0


print(answer)
