import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")
nums = list(map(int, file.readline().rstrip().split()))


# 값들이 거의 정렬되어 있는 경우 O(N)
def selectionSort(arr):
    for i in range(len(arr) - 1):
        minIndex = i

        for j in range(i + 1, len(arr)):
            if arr[minIndex] > arr[j]:
                minIndex = j

        arr[i], arr[minIndex] = arr[minIndex], arr[i]


selectionSort(nums)
print(nums)

file.close()
