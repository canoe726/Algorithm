import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


def is_rotate(s1, s2):
    if len(s1) != len(s2):
        return False

    size = len(s1)
    comp = s2 + s2

    for i in range(size):
        counts = 0
        for j in range(size):
            if comp[i + j] == s1[j]:
                counts += 1

        if counts == size:
            return True
    return False


# best: O(a), worst: O(a + b)
def is_substring(a, b):
    if b in a:
        return True
    return False


def is_rotate_2(s1, s2):
    if not s1 or not s1 or len(s1) != len(s2):
        return False

    return is_substring(s2 + s2, s1)


for line in file:
    s1, s2 = line.split(" ")

    print(is_rotate_2(s1, s2.rstrip()))

file.close()
