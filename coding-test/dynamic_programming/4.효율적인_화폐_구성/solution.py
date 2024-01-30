import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

file = open(filePath + "/" + "input", "r")

N, M = list(map(int, file.readline().split()))

INF = int(1e9)
MAX_MONEY = int(1e4)

dp = [INF] * (10 + 1)
nums = []


for _ in range(N):
    n = list(map(int, file.readline().split()))[0]
    nums.append(n)
    dp[n] = 1


for m in range(1, M + 1):
    for num in nums:
        diff = m - num

        if diff > 0:
            dp[m] = min(dp[m], dp[diff] + 1)

answer = dp[M]

if answer == INF:
    print(-1)
else:
    print(dp[M])

file.close()
