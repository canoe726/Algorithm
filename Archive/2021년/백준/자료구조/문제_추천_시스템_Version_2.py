# 22.06.22 시간초과
import sys
import heapq
input = sys.stdin.readline

MAX = 100_001
solved = [True] * MAX

cMinHeap = []
cMaxHeap = []
minHeap = []
maxHeap = []

def pushProblem(G, L, P):
  heapq.heappush(cMinHeap, [G, L, P])
  heapq.heappush(cMaxHeap, [-G, -L, -P])
  heapq.heappush(minHeap, [L, P])
  heapq.heappush(maxHeap, [-L, -P])

def popSolved():
  while cMinHeap and solved[cMinHeap[0][2]]:
    heapq.heappop(cMinHeap)
  while cMaxHeap and solved[-cMaxHeap[0][2]]:
    heapq.heappop(cMaxHeap)
  while minHeap and solved[minHeap[0][1]]:
    heapq.heappop(minHeap)
  while maxHeap and solved[-maxHeap[0][1]]:
    heapq.heappop(maxHeap)

n = int(input().rstrip())
for i in range(n):
  nums = list(map(int, input().rstrip().split()))
  P = int(nums[0])
  L = int(nums[1])
  G = int(nums[2])
  pushProblem(G, L, P)
  solved[P] = False

answer = []
loop = int(input().rstrip())
for i in range(loop):
  cmd = input().rstrip().split()

  if (cmd[0] == 'add'):
    P = int(cmd[1])
    L = int(cmd[2])
    G = int(cmd[3])
    popSolved()
    pushProblem(G, L, P)
    solved[P] = False

  elif (cmd[0] == 'recommend'):
    G = int(cmd[1])
    x = int(cmd[2])
    pushList = []
    popSolved()  
    if x == 1:
      while cMaxHeap:
        if G == -cMaxHeap[0][0]:
          if solved[-cMaxHeap[0][2]]:
            heapq.heappop(cMaxHeap)
            continue
          else:
            answer.append(-cMaxHeap[0][2])
            break
        else:
          cTop = heapq.heappop(cMaxHeap)
          pushList.append(cTop)
      while pushList:
        heapq.heappush(cMaxHeap, pushList.pop())
    else:
      while cMinHeap:
        if G == cMinHeap[0][0]:
          if solved[-cMinHeap[0][2]]:
            heapq.heappop(cMinHeap)
            continue
          else:
            answer.append(cMinHeap[0][2])
            break
        else:
          cTop = heapq.heappop(cMinHeap)
          pushList.append(cTop)
      while pushList:
        heapq.heappush(cMinHeap, pushList.pop())

  elif (cmd[0] == 'recommend2'):
    x = int(cmd[1])
    popSolved()
    if (x == 1):
      if cMaxHeap:
        answer.append(-maxHeap[0][1])
    else:
      if cMinHeap:
        answer.append(minHeap[0][1])

  elif (cmd[0] == 'recommend3'):
    x = int(cmd[1])
    L = int(cmd[2])
    pushList = []
    popSolved()  
    if x == 1:
      while minHeap:
        if L <= minHeap[0][0]:
          if solved[minHeap[0][1]]:
            heapq.heappop(minHeap)
            continue
          else:
            answer.append(minHeap[0][1])
            break
        else:
          cTop = heapq.heappop(minHeap)
          pushList.append(cTop)
      if len(minHeap) == 0:
        answer.append(-1)
      while pushList:
        heapq.heappush(minHeap, pushList.pop())
    else:
      while maxHeap:
        if L >= -maxHeap[0][0]:
          if solved[-maxHeap[0][1]]:
            heapq.heappop(maxHeap)
            continue
          else:
            answer.append(-maxHeap[0][1])
            break
        else:
          cTop = heapq.heappop(maxHeap)
          pushList.append(cTop)
      if len(maxHeap) == 0:
        answer.append(-1)
      while pushList:
        heapq.heappush(maxHeap, pushList.pop())

  elif (cmd[0] == 'solved'):
    P = int(cmd[1])
    solved[P] = True

for a in answer:
  print(a)
