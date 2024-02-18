import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

N, M = map(int, file.readline().rstrip().split())

parent = [0] * (N + 1)

for n in range(1, N + 1):
    parent[n] = n


def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]


def union_parent(parent, a, b):
    a = find_parent(parent, a)
    b = find_parent(parent, b)

    if a < b:
        parent[b] = a
    else:
        parent[a] = b


maps = []
for _ in range(N):
    row = list(map(int, file.readline().rstrip().split()))
    maps.append(row)

orders = list(map(int, file.readline().rstrip().split()))

for x in range(N):
    for y in range(N):
        if maps[x][y] == 1:
            union_parent(parent, x + 1, y + 1)

answer = "YES"

for o_idx in range(1, len(orders)):
    prev, cur = orders[o_idx - 1], orders[o_idx]

    if find_parent(parent, prev) != find_parent(parent, cur):
        answer = "NO"
        break


print(parent)

print(answer)

file.close()
