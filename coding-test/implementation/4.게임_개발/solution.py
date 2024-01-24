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

myX, myY, myD = X, Y, D

visited[myX][myY] = True
answer += 1

while True:
    isMoved = False

    for i in range(4):
        # 1.
        nextDir = myD - (i + 1)
        if nextDir < 0:
            nextDir = 4 + nextDir

        nextMoveX, nextMoveY = move[nextDir]
        nextX, nextY = myX + nextMoveX, myY + nextMoveY

        # 2.
        if nextX < 0 or nextX >= N or nextY < 0 or nextY >= M:
            continue
        if maps[nextX][nextY] == 1:
            continue
        if visited[nextX][nextY]:
            continue

        myX, myY, myD = nextX, nextY, nextDir
        visited[myX][myY] = True
        isMoved = True
        answer += 1
        break

    if isMoved == False:
        backMoveX, backMoveY = move[myD]
        backX, backY = myX - backMoveX, myY - backMoveY

        if maps[backX][backY] == 1:
            break
        else:
            myX, myY = backX, backY

print(answer)
