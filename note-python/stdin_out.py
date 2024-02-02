import sys


def getFile(path):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)

    file = open(filePath + "/" + path, "r")
    return file
