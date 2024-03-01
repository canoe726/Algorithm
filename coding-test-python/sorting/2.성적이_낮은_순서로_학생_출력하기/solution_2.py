import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


answer = 0

N = list(map(int, file.readline().rstrip().split()))[0]
scores = []

for _ in range(N):
    name, score = list(map(str, file.readline().rstrip().split()))
    scores.append((int(score), name))


def quick_sort(arr, start, end, comp=lambda x, y: x <= y):
    if start >= end:
        return

    pivot = start
    left = start + 1
    right = end

    while left <= right:
        if left <= end and comp(arr[left], arr[pivot]):
            left += 1
        if right > start and comp(arr[pivot], arr[right]):
            right -= 1

        if left > right:
            arr[right], arr[pivot] = arr[pivot], arr[right]
        else:
            arr[left], arr[right] = arr[right], arr[left]

    quick_sort(arr, start, right - 1, comp)
    quick_sort(arr, right + 1, end, comp)


reverse_comp = lambda x, y: (x[0] == y[0] and x[1] < y[1]) or x[0] < y[0]

quick_sort(scores, 0, len(scores) - 1, comp=reverse_comp)
print(scores)

file.close()
