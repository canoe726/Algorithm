import sys
from collections import deque


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

V, E = map(int, file.readline().rstrip().split())
graph = [[] for _ in range(V + 1)]
inDegree = [0] * (V + 1)

for e in range(E):
    start, end = map(int, file.readline().rstrip().split())
    graph[start].append(end)
    inDegree[end] += 1


def topology_sort():
    result = []
    queue = deque()

    for v in range(1, V + 1):
        if inDegree[v] == 0:
            queue.append(v)

    while len(queue) > 0:
        now = queue.popleft()
        result.append(now)

        for node in graph[now]:
            inDegree[node] -= 1

            if inDegree[node] == 0:
                queue.append(node)

    for res in result:
        print(res, end=" ")


topology_sort()


file.close()
