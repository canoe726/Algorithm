import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

N, x = map(int, file.readline().rstrip().split())
nums = list(map(int, file.readline().rstrip().split()))


def lower_bound(array, target, start, end):
    while start < end:
        middle = (start + end) // 2

        if target > array[middle]:
            start = middle + 1
        else:
            end = middle

    if end == len(array):
        return None
    return end


def upper_bound(array, target, start, end):
    while start < end:
        middle = (start + end) // 2

        if target >= array[middle]:
            start = middle + 1
        else:
            end = middle

    if end == len(array):
        return None
    return end - 1


def count_by_value(array, target):
    n = len(array)

    start = lower_bound(array, target, 0, n)
    if start == None:
        return 0

    end = upper_bound(array, target, 0, n)

    return end - start + 1


count = count_by_value(nums, x)

if count == 0:
    print(-1)
else:
    print(count)

file.close()
