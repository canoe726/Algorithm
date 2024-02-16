from sys import stdin

answer = []

N = list(map(int, stdin.readline().rstrip().split()))[0]
nums = list(map(int, stdin.readline().rstrip().split()))

nums.sort()

size = len(nums)
if size % 2 == 0:
    print(nums[size // 2 - 1])
else:
    print(nums[size // 2])
