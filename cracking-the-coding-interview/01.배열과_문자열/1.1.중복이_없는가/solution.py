import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


# for문
# 시간복잡도 : O(N^2)
def is_redundant(string):
    for i in range(len(string) - 1):
        for j in range(i + 1, len(string)):
            if string[i] == string[j]:
                return True
    return False


# 해시테이블
# 시간복잡도 : O(N)
def is_redundant_2(string):
    check = [False for _ in range(128)]  # ASCII

    for i in range(len(string)):
        if check[ord(string[i])]:
            return True
        else:
            check[ord(string[i])] = True

    return False


# 비트벡터
# 시간복잡도 : O(N), 영문자로만 이루어져 있는 경우
def is_redundant_3(string):
    check = 0

    for i in range(len(string)):
        val = ord(string[i]) - ord("a")

        if (check & (1 << val)) > 0:
            return False

        check |= 1 << val

    return True


# 정렬
# 시간복잡도 : O(NlogN)
def merge(arr, start, mid, end):
    sorted = [0 for _ in range(len(arr))]
    s_idx = start
    left = start
    right = mid + 1

    while left <= mid and right <= end:
        if arr[left] <= arr[right]:
            sorted[s_idx] = arr[left]
            left += 1
        else:
            sorted[s_idx] = arr[right]
            right += 1
        s_idx += 1

    if left > mid:
        for i in range(right, end + 1):
            sorted[s_idx] = arr[i]
            s_idx += 1
    else:
        for i in range(left, mid + 1):
            sorted[s_idx] = arr[i]
            s_idx += 1

    for i in range(start, end + 1):
        arr[i] = sorted[i]


def merge_sort(arr, start, end):
    if start < end:
        mid = (start + end) // 2
        merge_sort(arr, start, mid)
        merge_sort(arr, mid + 1, end)
        merge(arr, start, mid, end)


def is_redundant_4(string):
    str_list = list(string)
    merge_sort(str_list, 0, len(str_list) - 1)

    for i in range(len(str_list) - 1):
        if str_list[i] == str_list[i + 1]:
            return True
    return False


N = list(map(int, file.readline().rstrip().split()))[0]
for _ in range(N):
    string = list(map(str, file.readline().rstrip().split()))[0]
    print(is_redundant_4(string))


file.close()
