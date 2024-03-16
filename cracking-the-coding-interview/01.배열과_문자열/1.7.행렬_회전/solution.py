import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


# clockwise 90deg
def rotate_matrix(matrix, size):
    new_matrix = [[0] * size for _ in range(size)]

    for i in range(size):
        for j in range(size):
            new_matrix[i][j] = matrix[size - 1 - j][i]

    return new_matrix


# clockwise 90deg
def rotate_matrix_2(matrix, size):
    if size == 0 or not matrix or (len(matrix) != len(matrix[0])):
        return False

    for layer in range(size // 2):
        first = layer
        last = size - 1 - layer

        for i in range(first, last):
            offset = i - first
            top = matrix[first][i]

            # 왼쪽 -> 위쪽
            matrix[first][i] = matrix[last - offset][first]
            # 아래쪽 -> 왼쪽
            matrix[last - offset][first] = matrix[last][last - offset]
            # 오른쪽 -> 아래쪽
            matrix[last][last - offset] = matrix[i][last]
            # 위쪽 -> 오른쪽
            matrix[i][last] = top

    return True


N = list(map(int, file.readline().rstrip()))[0]
for _ in range(N):
    size = list(map(int, file.readline().rstrip()))[0]
    matrix = []

    for i in range(size):
        row = list(map(int, file.readline().rstrip().split()))
        matrix.append(row)

    print(rotate_matrix_2(matrix, size))
    for m in matrix:
        print(m)
    print()

file.close()
