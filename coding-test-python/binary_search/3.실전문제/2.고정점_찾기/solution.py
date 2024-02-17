import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

N = list(map(int, file.readline().rstrip().split()))[0]
nums = list(map(int, file.readline().rstrip().split()))


def binary_search(nums, start, end):
    if start > end:
        return None

    middle = (start + end) // 2

    if middle == nums[middle]:
        return middle
    if middle > nums[middle]:
        return binary_search(nums, middle + 1, end)
    if middle < nums[middle]:
        return binary_search(nums, start, middle - 1)


fixed = binary_search(nums, 0, len(nums) - 1)

if fixed == None:
    print(-1)
else:
    print(fixed)

file.close()
