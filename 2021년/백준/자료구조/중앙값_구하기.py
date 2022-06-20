import heapq
import sys
input = sys.stdin.readline

n = int(input().rstrip())

def solution(nums):
  small = [] # 최대힙
  big = [] # 최소힙
  middle = nums[0]
  result = [middle]

  for idx in range(1, len(nums)):
    value = nums[idx]
    if (value > middle):
      heapq.heappush(big, value)
    else:
      heapq.heappush(small, (-value, value))

    if (idx % 2 == 0):
      if (len(big) > len(small)):
        heapq.heappush(small, (-middle, middle))
        middle = heapq.heappop(big)
      elif (len(big) < len(small)):
        heapq.heappush(big, middle)
        middle = heapq.heappop(small)[1]
      result.append(middle)
  
  for i in range(len(result)):
    if (i != 0 and (i + 1) % 10 == 1):
      print()
    print(result[i], end = ' ')
  print()

for i in range(n):
    nums = []
    size = int(input().rstrip())
    if (size % 10 == 0):
      for j in range(size // 10):
        nums.extend(list(map(int, input().rstrip().split())))
    else:
      for j in range((size // 10) + 1):
        nums.extend(list(map(int, input().rstrip().split())))
    solution(nums)
