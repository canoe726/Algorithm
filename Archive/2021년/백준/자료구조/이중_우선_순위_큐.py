import heapq
import sys
input = sys.stdin.readline

n = int(input())
K = 1_000_001

for i in range(n):
  loop = int(input())
  deleted = [True] * K
  minHeap = []
  maxHeap = []

  for key in range(loop):
    str = input().rsplit()
    operator = str[0]
    number = int(str[1])
    if (operator == 'I'):
      heapq.heappush(minHeap, (number, key))
      heapq.heappush(maxHeap, (number * -1, key))
      deleted[key] = False
    else:
      if (number == -1): # 최소
        while minHeap and deleted[minHeap[0][1]]:
          heapq.heappop(minHeap)
        if minHeap:
          deleted[minHeap[0][1]] = True
          heapq.heappop(minHeap)
      else: # 최대
        while maxHeap and deleted[maxHeap[0][1]]:
          heapq.heappop(maxHeap)
        if maxHeap:
          deleted[maxHeap[0][1]] = True
          heapq.heappop(maxHeap)

  while minHeap and deleted[minHeap[0][1]]:
    heapq.heappop(minHeap)
  while maxHeap and deleted[maxHeap[0][1]]:
    heapq.heappop(maxHeap)

  if (minHeap and maxHeap):
    print(maxHeap[0][0] * -1, minHeap[0][0])
  else:
    print("EMPTY")
