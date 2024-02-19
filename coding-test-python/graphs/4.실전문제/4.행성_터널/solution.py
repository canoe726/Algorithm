from sys import stdin

answer = 0

N = list(map(int, stdin.readline().rstrip().split()))[0]
edges = []

X = []
Y = []
Z = []

for node in range(N):
    x, y, z = list(map(int, stdin.readline().rstrip().split()))
    X.append((x, node))
    Y.append((y, node))
    Z.append((z, node))

X.sort()
Y.sort()
Z.sort()

for i in range(N - 1):
    edges.append((X[i + 1][0] - X[i][0], X[i][1], X[i + 1][1]))
    edges.append((Y[i + 1][0] - Y[i][0], Y[i][1], Y[i + 1][1]))
    edges.append((Z[i + 1][0] - Z[i][0], Z[i][1], Z[i + 1][1]))

edges.sort()

parent = [0] * N
for p in range(N):
    parent[p] = p


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


for edge in edges:
    cost, a, b = edge

    if find_parent(parent, a) != find_parent(parent, b):
        union_parent(parent, a, b)
        answer += cost


print(answer)
