hw = list(map(int, input().split()))
h = hw[0]
w = hw[1]
heights = list(map(int, input().split()))

answer = 0
for i in range(1, len(heights) - 1):
  left = max(heights[:i])
  right = max(heights[i + 1:])
  minHeight = min(left, right)
  if minHeight > heights[i]:
    answer += (minHeight - heights[i])

print(answer)
