from sys import stdin

answer = 0

N = list(map(int, stdin.readline().rstrip().split()))[0]
triangle = [[0] * (N + 1) for _ in range(N + 1)]
dp = [[0] * (N + 1) for _ in range(N + 1)]

for x in range(1, N + 1):
    nums = list(map(int, stdin.readline().rstrip().split()))

    for y in range(len(nums)):
        triangle[x][y + 1] = nums[y]

for x in range(1, N + 1):
    for y in range(1, N + 1):
        dp[x][y] = max(
            dp[x][y],
            dp[x - 1][y - 1] + triangle[x][y],
            dp[x - 1][y] + triangle[x][y],
        )

for i in range(1, N + 1):
    if dp[N][i] > answer:
        answer = dp[N][i]

print(answer)
