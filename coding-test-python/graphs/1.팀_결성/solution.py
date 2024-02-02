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
operations = []
parents = [0] * (N + 1)


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


for i in range(N + 1):
    parents[i] = i

for m in range(M):
    operation, a, b = map(int, file.readline().rstrip().split())
    operations.append((operation, a, b))

for operation in operations:
    o, a, b = operation

    if o == 0:
        union_parent(parents, a, b)
    else:
        if find_parent(parents, a) == find_parent(parents, b):
            print("YES")
        else:
            print("NO")

operations.sort(key=lambda x: x[0])

print(parents)

file.close()
