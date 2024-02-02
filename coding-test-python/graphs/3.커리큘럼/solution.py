import sys
import copy
from collections import deque


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

N = list(map(int, file.readline().rstrip().split()))[0]
graphs = [[] for _ in range(N + 1)]
inDegree = [0] * (N + 1)
times = [0] * (N + 1)

for n in range(1, N + 1):
    row = list(map(int, file.readline().rstrip().split()))
    times[n] = row[0]

    for course in row[1:-1]:
        graphs[course].append(n)
        inDegree[n] += 1


def topology_sort():
    result = copy.deepcopy(times)
    queue = deque()

    for i in range(1, N + 1):
        if inDegree[i] == 0:
            queue.append(i)

    while len(queue) > 0:
        now = queue.popleft()

        for node in graphs[now]:
            result[node] = max(result[node], result[now] + times[node])
            inDegree[node] -= 1

            if inDegree[node] == 0:
                queue.append(node)

    for i in range(1, N + 1):
        print(result[i])


topology_sort()


file.close()
