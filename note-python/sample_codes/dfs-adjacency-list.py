graph = [[] for _ in range(3)]

graph[0].append((1, 7))  # (노드, 거리)
graph[0].append((2, 5))
graph[1].append((0, 7))
graph[2].append((0, 5))

print(graph)
