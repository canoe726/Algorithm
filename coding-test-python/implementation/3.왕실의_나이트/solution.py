import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline
file = open(filePath + "/" + "input", "r")

answer = 0

pos = list(map(str, file.readline().split()))[0]

knight = {
    0: (-2, -1),
    2: (-2, 1),
    1: (2, -1),
    3: (2, 1),
    4: (-1, -2),
    5: (-1, 2),
    6: (1, -2),
    7: (1, 2),
}

row = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5,
    "f": 6,
    "g": 7,
    "h": 8,
}

x, y = row[pos[0]], int(pos[1])

SIZE = 8

for i in range(SIZE):
    kx, ky = knight[i]
    nx, ny = x + kx, y + ky

    if nx < 1 or nx > SIZE or ny < 1 or ny > SIZE:
        continue
    answer += 1

print(answer)
