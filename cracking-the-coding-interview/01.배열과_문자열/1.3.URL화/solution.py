import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0


def replace_space(string, size, replace):
    replace_size = len(replace)
    space_count = 0
    for i in range(size):
        if string[i] == " ":
            space_count += 1

    index = size + space_count * (replace_size - 1)
    str_list = ["" for _ in range(index + 1)]
    str_list[index] = "\0"

    for i in range(size - 1, -1, -1):
        if string[i] == " ":
            for j in range(replace_size):
                str_list[index - (replace_size - j)] = replace[j]
            index -= replace_size
        else:
            str_list[index - 1] = string[i]
            index -= 1

    return "".join(str_list)


for line in file:
    row = line.split(",")
    string = row[0]
    size = int(row[1].rstrip())

    url = replace_space(string, size, replace="%20")
    print(url)

file.close()
