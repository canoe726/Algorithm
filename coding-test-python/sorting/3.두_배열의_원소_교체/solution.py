import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
maxArr = []

N, K = list(map(int, file.readline().rstrip().split()))

arr1 = list(map(int, file.readline().rstrip().split()))
arr2 = list(map(int, file.readline().rstrip().split()))

arr1.sort()
arr2.sort(reverse=True)

for i in range(K):
    maxArr.append(arr2[i])

for i in range(K, N):
    maxArr.append(arr1[i])

print(sum(maxArr))

file.close()
