import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0
scores = []

N = list(map(int, file.readline().rstrip().split()))[0]
for i in range(N):
    name, score = list(map(str, file.readline().rstrip().split()))
    scores.append((name, int(score)))

sortedScores = sorted(scores, key=lambda item: item[1])

for score in sortedScores:
    print(score[0], end=" ")

file.close()
