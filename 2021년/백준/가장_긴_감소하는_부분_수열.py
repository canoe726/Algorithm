import sys
input=sys.stdin.readline

N = int(input())
nums = list(map(int, input().split()))

answer = 0
dp = [0] * N

for i in range(N):
    dp[i] = 1
    for j in range(i - 1, -1, -1):
        if (nums[j] > nums[i]):
            dp[i] = max(dp[i], dp[j] + 1)
    answer = max(answer, dp[i])

print(answer)

