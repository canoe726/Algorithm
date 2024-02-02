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

for v in range(1, V + 1):
    parent[v] = v

cycle = False

for _ in range(E):
    a, b = list(map(int, file.readline().rstrip().split()))

    if find_parent(parent, a) == find_parent(parent, b):
        cycle = True
        break
    else:
        union_parent(parent, a, b)

if cycle:
    print("사이클이 발생했습니다.")
else:
    print("사이클이 발생하지 않았습니다.")

print("원소가 속한 집합: ", end="")
for i in range(1, V + 1):
    print(find_parent(parent, i), end=" ")
print()

print("부모 테이블: ", end="")
for i in range(1, V + 1):
    print(parent[i], end=" ")


file.close()
