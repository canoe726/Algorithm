from sys import stdin
from collections import deque

N, M, K, X = map(int, stdin.readline().rstrip().split())

cities = {}
dist = [-1] * (N + 1)

for _ in range(M):
    s, e = list(map(int, stdin.readline().rstrip().split()))

    if s in cities:
        cities[s].append(e)
    else:
        cities[s] = [e]

queue = deque([])
queue.append(X)

dist[0] = 0
dist[X] = 0

while len(queue) > 0:
    cur_node = queue.popleft()

    if cur_node in cities:
        for node in cities[cur_node]:
            if dist[node] == -1:
                queue.append(node)
                dist[node] = dist[cur_node] + 1

count = 0
answer = ""

for i in range(1, len(dist)):
    if dist[i] == K:
        count += 1
        answer += str(i) + "\n"

if count == 0:
    print(-1)
else:
    print(answer)
