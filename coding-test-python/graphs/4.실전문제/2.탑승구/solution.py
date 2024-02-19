import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

G = list(map(int, file.readline().rstrip().split()))[0]
P = list(map(int, file.readline().rstrip().split()))[0]

parent = [0] * (G + 1)
for i in range(G + 1):
    parent[i] = i


def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]


def union_parent(parent, a, b):

    print("a, b : ", a, b)
    a = find_parent(parent, a)
    b = find_parent(parent, b)

    if a < b:
        parent[b] = a
    else:
        parent[a] = b


prev = -1
count = 0

for i in range(P):
    air_plane = list(map(int, file.readline().rstrip().split()))[0]

    if find_parent(parent, air_plane) == 0:
        break

    while True:
        if parent[air_plane] != air_plane:
            air_plane -= 1
        else:
            union_parent(parent, air_plane - 1, air_plane)
            count += 1
            break

    print(parent, find_parent(parent, air_plane - 1), find_parent(parent, air_plane))


print(count)

file.close()
