from sys import stdin
import heapq

N = list(map(int, stdin.readline().rstrip().split()))[0]
nums = []
for _ in range(N):
    num = list(map(int, stdin.readline().rstrip().split()))[0]
    heapq.heappush(nums, num)

if N <= 1:
    print(0)
else:
    answer = 0

    while nums:
        m1 = heapq.heappop(nums)
        m2 = heapq.heappop(nums)
        answer += m1 + m2

        if len(nums) == 0:
            break

        heapq.heappush(nums, m1 + m2)

    print(answer)
