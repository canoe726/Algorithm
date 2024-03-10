import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


answer = 0

N, M = list(map(int, file.readline().rstrip().split()))
coins = []
dp = [0] * 10001
for i in range(N):
    coin = list(map(int, file.readline().rstrip().split()))[0]
    dp[coin] += 1
    coins.append(coin)

for i in range(1, M + 1):
    for j in range(N):
        if i - coins[j] > 0 and dp[i - coins[j]] > 0:
            value = dp[coins[j]] + dp[i - coins[j]]

            if dp[i] == 0:
                dp[i] = value
            else:
                dp[i] = min(dp[i], value)

if dp[M] == 0:
    print(-1)
else:
    print(dp[M])

file.close()
