import sys
import heapq


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

N, M = map(int, file.readline().rstrip().split())

INF = int(1e9)
graphs = [[] for _ in range(N + 1)]
dist = [INF] * (N + 1)

for _ in range(M):
    A, B = list(map(int, file.readline().rstrip().split()))
    graphs[A].append((B, 1))
    graphs[B].append((A, 1))

for g in graphs:
    g.sort()


def dijkstra(node):
    queue = []
    dist[0] = 0
    dist[1] = 0

    heapq.heappush(queue, (0, node))

    while queue:
        d, n = heapq.heappop(queue)
        if dist[n] < d:
            continue

        for cur_node in graphs[n]:
            end, cost = cur_node
            next_cost = dist[n] + cost

            if dist[end] > next_cost:
                dist[end] = next_cost
                heapq.heappush(queue, (dist[end], end))

    first_idx = -1
    max_dist = max(dist)
    count = 0
    for n in range(1, N + 1):
        if max_dist == dist[n]:
            if first_idx == -1:
                first_idx = n
            count += 1

    return [first_idx, max_dist, count]


a, b, c = dijkstra(1)

print(a, b, c)

file.close()
