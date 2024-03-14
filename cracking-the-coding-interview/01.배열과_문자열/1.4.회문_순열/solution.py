import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0


def is_palindrome(string):
    counts = [0 for _ in range(ord("z") - ord("a") + 1)]
    is_even = len(string) % 2 == 0

    str_list = list(string)
    for ch in str_list:
        counts[ord(ch) - ord("a")] += 1

    if is_even:
        for i in range(len(counts)):
            if counts[i] > 0 and counts[i] % 2 != 0:
                return False
        return True
    else:
        odd_count = 0
        for i in range(len(counts)):
            if counts[i] % 2 == 1:
                odd_count += 1
            elif counts[i] > 0 and counts[i] % 2 != 0:
                return False
        if odd_count > 1:
            return False
        return True


def is_palindrome_2(string):
    odd_count = 0
    counts = [0 for _ in range(ord("z") - ord("a") + 1)]

    str_list = list(string)
    for ch in str_list:
        index = ord(ch) - ord("a")
        counts[index] += 1

        if counts[index] % 2 == 1:
            odd_count += 1
        else:
            odd_count -= 1

    if odd_count > 1:
        return False
    else:
        return True


def is_palindrome_3(string):
    switch = 0
    one_bit_counts = 0

    for i in range(len(string)):
        ch = ord(string[i]) - ord("a")

        if switch & (1 << ch) > 0:
            switch = switch ^ (1 << ch)
        else:
            switch = switch | (1 << ch)

    # get num of 1 bits
    for i in range(0, 32):
        if switch & (1 << i) != 0:
            one_bit_counts += 1

    if one_bit_counts > 1:
        return False
    else:
        return True


def is_palindrome_4(string):
    switch = 0

    for i in range(len(string)):
        ch = ord(string[i]) - ord("a")

        if switch & (1 << ch) > 0:
            switch = switch ^ (1 << ch)
        else:
            switch = switch | (1 << ch)

    if switch & (switch - 1) > 0:
        return False
    else:
        return True


# 알파벳만 주어진다.
for line in file:
    string = line.replace(" ", "")
    string = string.lower()

    print(is_palindrome_4(string))


file.close()
