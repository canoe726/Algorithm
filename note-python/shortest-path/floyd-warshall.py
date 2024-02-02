import sys
import heapq


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
INF = int(1e9)

V = list(map(int, file.readline().rstrip().split()))[0]
E = list(map(int, file.readline().rstrip().split()))[0]

distance = [([INF] * V) for _ in range(V)]

for i in range(E):
    s, e, cost = list(map(int, file.readline().rstrip().split()))
    start, end = s - 1, e - 1
    distance[start][end] = cost

for i in range(V):
    distance[i][i] = 0


def floydWarshall():
    for v in range(V):
        for i in range(V):
            for j in range(V):
                distance[i][j] = min(distance[i][j], distance[i][v] + distance[v][j])


floydWarshall()

for dRow in distance:
    for dCol in dRow:
        print(dCol, end=" ")
    print()


file.close()
