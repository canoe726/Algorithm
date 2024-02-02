import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


def find_parent(parents, node):
    if parents[node] != node:
        parents[node] = find_parent(parents, parents[node])
    return parents[node]


def union_parent(parents, a, b):
    a = find_parent(parents, a)
    b = find_parent(parents, b)

    if a > b:
        parents[a] = b
    else:
        parents[b] = a


file = getFile("input")

answer = 0

N, M = map(int, file.readline().rstrip().split())
parents = [0] * (N + 1)
edges = []

for i in range(N + 1):
    parents[i] = i

for _ in range(M):
    A, B, C = list(map(int, file.readline().rstrip().split()))
    edges.append((A, B, C))

edges.sort(key=lambda x: x[2])
answer = 0
largeEdge = 0

for edge in edges:
    start, end, cost = edge

    if find_parent(parents, start) == find_parent(parents, end):
        continue

    union_parent(parents, start, end)
    answer += cost
    largeEdge = cost

print(answer - largeEdge)

file.close()
