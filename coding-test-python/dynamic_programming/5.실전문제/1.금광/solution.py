import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

N = list(map(int, file.readline().rstrip().split()))[0]

for _ in range(N):
    N, M = map(int, file.readline().rstrip().split())
    nums = list(map(int, file.readline().rstrip().split()))

    mines = [[0] * (M + 1) for _ in range(N + 2)]
    dp = [[0] * (M + 1) for _ in range(N + 2)]

    for x in range(N):
        for y in range(M):
            mines[x + 1][y + 1] = nums[(x) * M + y]

    for y in range(1, M + 1):
        for x in range(1, N + 1):
            dp[x][y] = max(
                dp[x][y],
                dp[x][y - 1] + mines[x][y],
                dp[x - 1][y - 1] + mines[x][y],
                dp[x + 1][y - 1] + mines[x][y],
            )

    answer = 0
    for i in range(1, N + 1):
        if dp[i][M] > answer:
            answer = dp[i][M]

    print(answer)

file.close()
