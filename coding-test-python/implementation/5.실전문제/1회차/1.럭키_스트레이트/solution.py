import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

N = list(map(str, file.readline().strip()))
n_size = len(N)

left = sum(map(int, N[0 : n_size // 2]))
right = sum(map(int, N[n_size // 2 : n_size]))

if left == right:
    print("LUCKY")
else:
    print("READY")

file.close()
