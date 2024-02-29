import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

nums = list(map(int, file.readline().rstrip().split()))


def heapify(arr):
    last = len(arr) // 2 - 1
    for current in range(last, -1, -1):
        while current <= last:
            child = current * 2 + 1
            sibling = child + 1

            if sibling < len(arr) and arr[child] > arr[sibling]:
                child = sibling
            if arr[current] > arr[child]:
                arr[current], arr[child] = arr[child], arr[current]
                current = child
            else:
                break


heapify(nums)
print(nums)

file.close()
