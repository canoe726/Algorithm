import sys
from collections import deque


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
INF = int(1e9)

V, E = map(int, file.readline().rstrip().split())
startAt = list(map(int, file.readline().rstrip().split()))[0]

graph = [[] for _ in range(V + 1)]
visited = [False] * (V + 1)
distance = [INF] * (V + 1)

for i in range(E):
    start, end, cost = list(map(int, file.readline().rstrip().split()))
    graph[start].append((end, cost))


def get_shortest_node():
    nodeIndex = -1
    minDist = INF

    for v in range(1, V + 1):
        if visited[v] == False and minDist > distance[v]:
            minDist = min(minDist, distance[v])
            nodeIndex = v

    return nodeIndex


def dijkstra(node):
    queue = deque([node])
    distance[node] = 0

    while len(queue) > 0:
        curNode = queue.popleft()
        visited[curNode] = True

        for n in graph[curNode]:
            end, cost = n
            distance[end] = min(distance[end], distance[curNode] + cost)

        nextNode = get_shortest_node()

        if nextNode >= 0:
            queue.append(nextNode)


dijkstra(startAt)

for v in range(1, V + 1):
    if distance[v] == INF:
        print("Infinity")
    else:
        print(distance[v])

file.close()
