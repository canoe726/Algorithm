import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline
file = open(filePath + "/" + "input", "r")

answer = 0

N = list(map(int, file.readline().split()))[0]
directions = list(map(str, file.readline().split()))

move = {
    "L": (0, -1),
    "R": (0, 1),
    "U": (-1, 0),
    "D": (1, 0),
}

pos = [1, 1]

for dir in directions:
    x, y = pos
    mx, my = move[dir]

    nx, ny = x + mx, y + my

    if nx < 1 or nx > N or ny < 1 or ny > N:
        continue

    pos[0], pos[1] = nx, ny

print(str(pos[0]), str(pos[1]))
