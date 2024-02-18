import sys
import heapq


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

T = list(map(int, file.readline().rstrip().split()))[0]


def get_value():
    INF = int(1e9)
    N = list(map(int, file.readline().rstrip().split()))[0]

    maps = []
    for _ in range(N):
        row = list(map(int, file.readline().rstrip().split()))
        maps.append(row)

    dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    dist = [[INF] * N for _ in range(N)]
    queue = []
    heapq.heappush(queue, (maps[0][0], 0, 0))

    while queue:
        d, x, y = heapq.heappop(queue)

        if dist[x][y] < d:
            continue

        for dir in dirs:
            dx, dy = dir
            nx, ny = x + dx, y + dy

            if nx < 0 or nx >= N or ny < 0 or ny >= N:
                continue

            cost = d + maps[nx][ny]
            if dist[nx][ny] > cost:
                dist[nx][ny] = cost
                heapq.heappush(queue, (cost, nx, ny))

    return dist[N - 1][N - 1]


for _ in range(T):
    print(get_value())

file.close()
