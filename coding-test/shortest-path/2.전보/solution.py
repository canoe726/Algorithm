import sys
import heapq


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

INF = int(1e9)

N, M, C = list(map(int, file.readline().rstrip().split()))
graph = [[] for _ in range(N + 1)]
distance = [INF] * (N + 1)
distance[0] = -1

for i in range(M):
    X, Y, Z = list(map(int, file.readline().rstrip().split()))
    graph[X].append((Y, Z))

print(graph)


def dijkstra(node):
    heap = []
    heapq.heappush(heap, (0, node))
    distance[node] = 0

    while len(heap) > 0:
        dist, now = heapq.heappop(heap)

        if distance[now] < dist:
            continue

        for curNode in graph[now]:
            end, cost = curNode

            if distance[end] > distance[now] + cost:
                distance[end] = distance[now] + cost
                heapq.heappush(heap, (distance[end], end))


dijkstra(C)
print(distance)

cities = 0
sendTime = 0

for node in range(2, N + 1):
    if distance[node] == INF:
        continue

    cities += 1
    sendTime = max(sendTime, distance[node])

print(cities, sendTime)

file.close()
