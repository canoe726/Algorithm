N = int(input())
nums = list(map(int, input().split()))
nums.sort()

if N < 3:
  print(N)
else:
  maxLen = -1

  for i in range(len(nums) - 2):
    min1 = nums[i]
    min2 = nums[i + 1]

    for j in range(i + 2, len(nums)):
      if min1 + min2 > nums[j]:
        size = j - i + 1
        if size > maxLen:
          maxLen = size

  if maxLen == -1:
    print(2)
  else:
    print(maxLen)
