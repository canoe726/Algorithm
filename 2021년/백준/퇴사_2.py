import sys
input=sys.stdin.readline

N = int(input())
T = [0]
P = [0]
dp = [0] * (N + 2)
for i in range(N):
    [t, p] = list(map(int, input().split()))
    T.append(t)
    P.append(p)
T.append(0)
P.append(0)

maxPrice = 0
for i in range(1, N + 2):
    maxPrice = max(maxPrice, dp[i])
    day = i + T[i]
    if (day <= N + 1):
        dp[day] = max(dp[day], maxPrice + P[i])

print(dp[N + 1])

