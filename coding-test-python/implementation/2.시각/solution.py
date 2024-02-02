import sys

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline
file = open(filePath + "/" + "input", "r")

answer = 0

N = list(map(int, file.readline().split()))[0]

for hour in range(N + 1):
    for minute in range(60):
        for second in range(60):
            if "3" in str(hour) + str(minute) + str(second):
                answer += 1


print(answer)
