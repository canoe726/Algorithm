import heapq
import sys
input = sys.stdin.readline

MAX = 100_001
solved = [True] * MAX

minQ = [] # 쉬운 문제순으로 가져오기
maxQ = [] # 어려운 문제순으로 가져오기

num = int(input().rstrip())
for i in range(num):
  problem = list(map(int, input().rstrip().split()))
  P = problem[0]
  L = problem[1]
  heapq.heappush(minQ, [L, P])
  heapq.heappush(maxQ, [-L, -P])
  solved[P] = False

answer = []
loop = int(input())
for i in range(loop):
  cmd = input().rstrip().split()
  if (cmd[0] == 'add'):
    P = int(cmd[1])
    L = int(cmd[2])
    while minQ and solved[minQ[0][1]]:
      heapq.heappop(minQ)
    while maxQ and solved[-maxQ[0][1]]:
      heapq.heappop(maxQ)
    solved[P] = False
    heapq.heappush(minQ, [L, P])
    heapq.heappush(maxQ, [-L, -P])
  elif (cmd[0] == 'recommend'):
    x = int(cmd[1])
    if (x == 1):
      while maxQ and solved[-maxQ[0][1]]:
        heapq.heappop(maxQ)
      if maxQ:
        answer.append(-maxQ[0][1])
    else:
      while minQ and solved[minQ[0][1]]:
        heapq.heappop(minQ)
      if minQ:
        answer.append(minQ[0][1])
  elif (cmd[0] == 'solved'):
    P = int(cmd[1])
    solved[P] = True

for i in range(len(answer)):
  print(answer[i])

