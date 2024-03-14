import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


def is_one_edit_dist(a, b):
    counts = [0 for _ in range(ord("z") - ord("a") + 1)]
    a_len = len(a)
    b_len = len(b)

    for i in range(a_len):
        index = ord(a[i]) - ord("a")
        counts[index] += 1

    for i in range(b_len):
        index = ord(b[i]) - ord("a")
        if counts[index] > 0:
            counts[index] -= 1
        else:
            counts[index] += 1

    if a_len == b_len:
        return sum(counts) <= 2
    else:
        return sum(counts) <= 1


def is_one_edit_dist_2(a, b):
    a_len = len(a)
    b_len = len(b)

    def replace(a, b):
        is_diff = False

        for i in range(len(a)):
            if a[i] != b[i]:
                if is_diff:
                    return False
                is_diff = True
        return True

    def insert(a, b):
        a_idx = 0
        b_idx = 0

        while a_idx < len(a) and b_idx < len(b):
            if a[a_idx] != b[b_idx]:
                if a_idx != b_idx:
                    return False
                b_idx += 1
            else:
                a_idx += 1
                b_idx += 1
        return True

    if a_len == b_len:
        return replace(a, b)
    elif a_len > b_len:
        return insert(b, a)
    else:
        return insert(a, b)


def is_one_edit_dist_3(a, b):
    if abs(len(a) - len(b)) > 1:
        return False

    s1, s2 = a, b
    if len(a) > len(b):
        s1, s2 = b, a

    idx1 = 0
    idx2 = 0
    foundDiff = False

    while idx1 < len(s1) and idx2 < len(s2):
        if s1[idx1] != s2[idx2]:
            if foundDiff:
                return False
            foundDiff = True
            if len(s1) == len(s2):
                idx1 += 1
        else:
            idx1 += 1
        idx2 += 1

    return True


# 알파벳만 주어진다.
for line in file:
    a, b = line.rstrip().replace(" ", "").split(",")
    a, b = a.lower(), b.lower()

    print(is_one_edit_dist_3(a, b))


file.close()
