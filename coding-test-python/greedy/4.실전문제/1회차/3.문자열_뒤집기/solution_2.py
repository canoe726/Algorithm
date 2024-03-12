answer = 0

nums = list(map(int, list(list(map(str, input().rstrip().split()))[0])))

zero = 0
one = 0

# 전부 0으로
prev = nums[0]
if nums[0] == 1:
    zero += 1

for i in range(1, len(nums)):
    if prev != nums[i] and nums[i] == 1:
        zero += 1

    prev = nums[i]

# 전부 1로
prev = nums[0]
if nums[0] == 0:
    one += 1

for i in range(1, len(nums)):
    if prev != nums[i] and nums[i] == 0:
        one += 1

    prev = nums[i]

answer = min(zero, one)
print(answer)
