import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


def compress_string(string):
    compressed = ""
    counts = 1

    start = string[0]
    for i in range(1, len(string)):
        if start == string[i]:
            counts += 1
        else:
            compressed += str(counts) + start
            counts = 1
            start = string[i]
    compressed += str(counts) + start

    if len(compressed) > len(string):
        return string
    else:
        return compressed


def compress_string_2(string):
    buffer = []
    counts = 1

    start = string[0]
    for i in range(1, len(string)):
        if start == string[i]:
            counts += 1
        else:
            buffer.append(str(counts) + start)
            counts = 1
            start = string[i]
    buffer.append(str(counts) + start)
    result = "".join(buffer)

    if len(result) > len(string):
        return string
    else:
        return result


for line in file:
    print(compress_string(line.rstrip()))


file.close()
