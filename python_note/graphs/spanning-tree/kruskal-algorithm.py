import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


def find_parent(parent, n):
    if parent[n] != n:
        parent[n] = find_parent(parent, parent[n])
    return parent[n]


def union_parent(parent, a, b):
    a = find_parent(parent, a)
    b = find_parent(parent, b)

    if a > b:
        parent[a] = b
    else:
        parent[b] = a


file = getFile("input")

V, E = map(int, file.readline().rstrip().split())
parent = [0] * (V + 1)
edges = []
answer = 0

for v in range(1, V + 1):
    parent[v] = v

for _ in range(E):
    start, end, cost = list(map(int, file.readline().rstrip().split()))
    edges.append((start, end, cost))

edges.sort(key=lambda x: x[2])

# 가장 비용이 낮은 edge 부터 순회하면서 cycle 이 없으면 union
for edge in edges:
    start, end, cost = edge

    if find_parent(parent, start) == find_parent(parent, end):
        continue
    union_parent(parent, start, end)
    answer += cost

print(answer)

file.close()
