import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

file = open(filePath + "/" + "input", "r")

N = list(map(int, file.readline().split()))[0]
foods = list(map(int, file.readline().split()))

dp = [0] * (N)
dp[0] = foods[0]
dp[1] = max(dp[0], foods[1])

for n in range(2, N):
    dp[n] = max(dp[n], foods[n] + dp[n - 2], dp[n - 1])

print(dp[N - 1])

file.close()
