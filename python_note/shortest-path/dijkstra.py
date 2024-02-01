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

V, E = map(int, file.readline().rstrip().split())
startAt = list(map(int, file.readline().rstrip().split()))[0]

graph = [[] for _ in range(V + 1)]
distance = [INF] * (V + 1)

for i in range(E):
    start, end, cost = list(map(int, file.readline().rstrip().split()))
    graph[start].append((end, cost))


def dijkstra(node):
    heap = []
    heapq.heappush(heap, (0, node))
    distance[node] = 0

    while len(heap) > 0:
        dist, curNode = heapq.heappop(heap)

        if dist < distance[curNode]:
            continue

        for n in graph[curNode]:
            end, cost = n

            if distance[end] > distance[curNode] + cost:
                distance[end] = min(distance[end], distance[curNode] + cost)
                heapq.heappush(heap, (distance[end], end))


dijkstra(startAt)

for v in range(1, V + 1):
    if distance[v] == INF:
        print("Infinity")
    else:
        print(distance[v])

file.close()
