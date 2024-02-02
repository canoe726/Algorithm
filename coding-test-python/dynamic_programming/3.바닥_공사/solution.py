import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

file = open(filePath + "/" + "input", "r")

N = list(map(int, file.readline().split()))[0]
DIV = 796796

dp = [0] * (N + 1)
dp[0] = 1
dp[1] = 1

for n in range(2, N + 1):
    dp[n] = (dp[n - 1] + dp[n - 2] * 2) % DIV

print(dp[N])

file.close()
