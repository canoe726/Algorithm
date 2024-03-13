import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

str1 = list(map(str, file.readline().rstrip().split()))[0]
str2 = list(map(str, file.readline().rstrip().split()))[0]


# 순열 관계 = 순서를 바꾸어도 구성이 동일한 것
def is_perm_relation(str1, str2):
    if len(str1) != len(str2):
        return False

    str1_list = list(str1)
    str2_list = list(str2)

    str1_list.sort()
    str2_list.sort()

    for i in range(len(str1)):
        if str1_list[i] != str2_list[i]:
            return False
    return True


def is_perm_relation_2(str1, str2):
    if len(str1) != len(str2):
        return False

    ASCII_SIZE = 128
    counts = [0 for _ in range(ASCII_SIZE)]

    for i in range(len(str1)):
        counts[ord(str1[i])] += 1
        counts[ord(str2[i])] += 1

    for i in range(ASCII_SIZE):
        if counts[i] > 0 and counts[i] != 2:
            return False

    return True


print(is_perm_relation_2(str1, str2))


file.close()
