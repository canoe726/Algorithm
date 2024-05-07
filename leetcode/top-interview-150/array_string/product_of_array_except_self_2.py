class Solution(object):
    def productExceptSelf(self, nums):
        n = len(nums)
        answer = [1] * n

        for i in range(1, n):
            answer[i] = answer[i - 1] * nums[i - 1]
        for i in range(n - 2, 0, -1):
            nums[i] = nums[i] * nums[i + 1]
        for i in range(0, n - 1):
            answer[i] = answer[i] * nums[i + 1]

        return answer
