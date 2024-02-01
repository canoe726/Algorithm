import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


def find_parent(parent, vertex):
    if parent[vertex] != vertex:
        parent[vertex] = find_parent(parent, parent[vertex])
    return parent[vertex]


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

for i in range(1, V + 1):
    parent[i] = i

for i in range(E):
    a, b = list(map(int, file.readline().rstrip().split()))
    union_parent(parent, a, b)

print("원소가 속한 집합: ", end="")
for i in range(1, V + 1):
    print(find_parent(parent, i), end=" ")
print()

print("부모 테이블: ", end="")
for i in range(1, V + 1):
    print(parent[i], end=" ")


file.close()
