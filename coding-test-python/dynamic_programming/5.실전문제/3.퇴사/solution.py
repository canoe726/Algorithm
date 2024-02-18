from sys import stdin

N = list(map(int, stdin.readline().split()))[0]
days = []
costs = []

for _ in range(N):
    day, cost = map(int, stdin.readline().split())
    days.append(day)
    costs.append(cost)

dp = [0] * (N + 1)
max_val = 0

for i in range(N - 1, -1, -1):
    time = days[i] + i

    if time <= N:
        dp[i] = max(costs[i] + dp[time], max_val)
        max_val = dp[i]
    else:
        dp[i] = max_val

print(max_val)
