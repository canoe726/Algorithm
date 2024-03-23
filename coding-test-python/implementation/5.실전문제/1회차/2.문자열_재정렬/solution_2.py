import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

answer = 0

string = list(map(str, file.readline().rstrip().split()))[0]


def merge(arr, temp_arr, left_start, right_start, right_end):
    left_end = right_start - 1
    temp_pos = left_start
    num_elements = right_end - left_start + 1

    while left_start <= left_end and right_start <= right_end:
        if arr[left_start] <= arr[right_start]:
            temp_arr[temp_pos] = arr[left_start]
            left_start += 1
        else:
            temp_arr[temp_pos] = arr[right_start]
            right_start += 1
        temp_pos += 1

    while left_start <= left_end:
        temp_arr[temp_pos] = arr[left_start]
        left_start += 1
        temp_pos += 1

    while right_start <= right_end:
        temp_arr[temp_pos] = arr[right_start]
        right_start += 1
        temp_pos += 1

    for i in range(num_elements):
        arr[right_end] = temp_arr[right_end]
        right_end -= 1


def merge_sort(arr):
    n = len(arr)
    temp_arr = [0] * n

    size = 1
    while size < n:
        left_start = 0
        while left_start < n - 1:
            mid = min(left_start + size - 1, n - 1)
            right_end = min(left_start + 2 * size - 1, n - 1)
            merge(arr, temp_arr, left_start, mid + 1, right_end)
            left_start += 2 * size
        size *= 2


chars = []
nums = []

for s in string:
    if ord(s) >= ord("0") and ord(s) <= ord("9"):
        nums.append(int(s))
    else:
        chars.append(s)

sum_value = 0
for n in nums:
    sum_value += n

merge_sort(chars)

chars.append(str(sum_value))
answer = "".join(chars)
print(answer)

file.close()
