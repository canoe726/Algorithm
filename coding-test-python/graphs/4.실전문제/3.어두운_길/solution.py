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
homes = []

for _ in range(M):
    X, Y, Z = list(map(int, file.readline().rstrip().split()))
    homes.append((Z, X, Y))

homes.sort()


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


parent = [0] * (N)

for p in range(N):
    parent[p] = p


total = sum(list(map(lambda x: x[0], homes)))


for home in homes:
    cost, a, b = home

    if find_parent(parent, a) != find_parent(parent, b):
        union_parent(parent, a, b)
        answer += cost


print(total - answer)

file.close()
