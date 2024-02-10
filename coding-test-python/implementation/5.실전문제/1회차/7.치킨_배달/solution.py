import sys
from itertools import combinations


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


N, M = list(map(int, file.readline().strip().split()))
cities = []

for _ in range(N):
    pos = list(map(int, file.readline().strip().split()))
    cities.append(pos)


def get_dist(pos1, pos2):
    x1, y1 = pos1
    x2, y2 = pos2

    return abs(x1 - x2) + abs(y1 - y2)


chickens = []
homes = []

for x in range(N):
    for y in range(N):
        if cities[x][y] == 1:
            homes.append((x, y))
        if cities[x][y] == 2:
            chickens.append((x, y))

INF = 987654321
combs = combinations(chickens, M)
answer = INF


for comb in combinations(chickens, M):
    dist_sum = 0

    for home in homes:
        dist = INF
        for chicken in comb:
            dist = min(dist, get_dist(home, chicken))

        dist_sum += dist

    answer = min(answer, dist_sum)

print(answer)
