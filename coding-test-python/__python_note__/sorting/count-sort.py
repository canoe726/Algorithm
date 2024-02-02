import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")
nums = list(map(int, file.readline().rstrip().split()))


# 크기 차이가 최대 100~1,000만 정도이거나 중복이 많을 때 사용
def countSort(arr, lastNum):
    sorted = [0] * (lastNum + 1)

    for item in arr:
        sorted[item] += 1

    return sorted


def getCountSorted(counts):
    sorted = []

    for i in range(len(counts)):
        for _ in range(counts[i]):
            sorted.append(i)

    return sorted


counts = countSort(nums, 9)
print(getCountSorted(counts))

file.close()
