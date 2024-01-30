import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

file = open(filePath + "/" + "input", "r")

X = list(map(int, file.readline().split()))[0]
MAX = X

dp = [0] * (MAX + 1)

for n in range(2, MAX + 1):
    dp[n] = dp[n - 1] + 1

    if n % 2 == 0:
        dp[n] = min(dp[n], dp[n // 2] + 1)
    if n % 3 == 0:
        dp[n] = min(dp[n], dp[n // 3] + 1)
    if n % 5 == 0:
        dp[n] = min(dp[n], dp[n // 5] + 1)

print(dp[X])

file.close()
