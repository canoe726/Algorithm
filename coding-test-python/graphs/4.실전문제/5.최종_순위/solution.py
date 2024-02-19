from sys import stdin
from collections import deque

T = list(map(int, stdin.readline().rstrip().split()))[0]


def find_answer():
    n = list(map(int, stdin.readline().rstrip().split()))[0]
    t = list(map(int, stdin.readline().rstrip().split()))
    m = list(map(int, stdin.readline().rstrip().split()))[0]

    indegree = [0] * (n + 1)
    graphs = [[False] * (n + 1) for _ in range(n + 1)]
    for i in range(n):
        for j in range(i + 1, n):
            graphs[t[i]][t[j]] = True
            indegree[t[j]] += 1

    for _ in range(m):
        a, b = list(map(int, stdin.readline().rstrip().split()))
        if graphs[a][b]:
            graphs[a][b] = False
            graphs[b][a] = True
            indegree[a] += 1
            indegree[b] -= 1
        else:
            graphs[a][b] = True
            graphs[b][a] = False
            indegree[a] -= 1
            indegree[b] += 1

    result = []
    queue = deque()

    for i in range(1, n + 1):
        if indegree[i] == 0:
            queue.append(i)

    is_one_way = True
    cycle = False

    for i in range(n):
        if len(queue) == 0:
            cycle = True
            break
        if len(queue) == 2:
            is_one_way = False
            break

        now = queue.popleft()
        result.append(now)

        for j in range(1, n + 1):
            if graphs[now][j]:
                indegree[j] -= 1

                if indegree[j] == 0:
                    queue.append(j)

    if cycle:
        return "IMPOSSIBLE"
    elif not is_one_way:
        return "?"
    else:
        string = ""
        for r in result:
            string += str(r) + " "

        return string


for _ in range(T):
    print(find_answer())
