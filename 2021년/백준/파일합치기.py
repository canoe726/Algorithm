import sys
from pprint import pprint
input=sys.stdin.readline

T = int(input())
for t in range(T):
  K = int(input())
  novel = [0]
  novel += list(map(int, input().split()))
  dp = [[0 for i in range(K + 1)] for i in range(K + 1)]
  knuth = [[0 for i in range(K + 1)] for i in range(K + 1)]
  acc = [0] * (K + 1)

  for i in range(1, K + 1):
    knuth[i][i] = i

  for i in range(1, K + 1):
    acc[i] = acc[i - 1] + novel[i]

  for i in range(1, K):
    for s in range(1, K - i + 1):
      e = s + i
      dp[s][e] = 9876543210
      # knuth optimiza
      for k in range(knuth[s][e - 1], knuth[s + 1][e] + 1):
        if k < K and dp[s][e] > dp[s][k] + dp[k + 1][e] + (acc[e] - acc[s - 1]):
          dp[s][e] = min(dp[s][e], dp[s][k] + dp[k + 1][e] + (acc[e] - acc[s - 1]))
          knuth[s][e] = k

  print(dp[1][K])
