import sys
input=sys.stdin.readline
import heapq

INF = 987654321
# 상 우 하 좌
dx = [0, 1, 0, -1]
dy = [-1, 0, 1, 0]

[M, N] = list(map(int, input().split()))
inputBoard = [0] * M

visited = [[False for i in range(N + 2)] for i in range(M + 2)]
board = [[INF for i in range(N + 2)] for i in range(M + 2)]
dp = [[0 for i in range(N + 2)] for i in range(M + 2)]
dp[1][1] = 1

for i in range(M):
    inputBoard[i] = list(map(int, input().split()))

for i in range(M):
    for j in range(N):
        board[i + 1][j + 1] = inputBoard[i][j]

heap = []
heapq.heappush(heap, (-board[1][1], [1, 1]))
visited[1][1] = True

while (heap):
  [cx, cy] = heapq.heappop(heap)[1]

  for i in range(4):
    [nx, ny] = [cx + dx[i], cy + dy[i]]
    if (board[cx][cy] > board[nx][ny]):
      dp[nx][ny] += dp[cx][cy]
      if (not visited[nx][ny]):
        visited[nx][ny] = True
        heapq.heappush(heap, (-board[nx][ny], [nx, ny]))

print(dp[M][N])

