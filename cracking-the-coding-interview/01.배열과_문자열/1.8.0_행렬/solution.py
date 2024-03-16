import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


def zero_matrix(matrix, m, n):
    pos = []

    for i in range(m):
        for j in range(n):
            if matrix[i][j] == 0:
                pos.append((i, j))

    while len(pos) > 0:
        x, y = pos.pop()

        for i in range(m):
            matrix[i][y] = 0
        for i in range(n):
            matrix[x][i] = 0

    return True


def row_nullify(matrix, r, n):
    for i in range(n):
        matrix[r][i] = 0


def col_nullify(matrix, c, m):
    for i in range(m):
        matrix[i][c] = 0


def zero_matrix_2(matrix, m, n):
    row = [False for _ in range(m)]
    col = [False for _ in range(n)]

    for i in range(m):
        for j in range(n):
            if matrix[i][j] == 0:
                row[i] = True
                col[j] = True

    for i in range(m):
        if row[i]:
            row_nullify(matrix, i, n)

    for i in range(n):
        if col[i]:
            col_nullify(matrix, i, m)


def zero_matrix_3(matrix, m, n):
    # 첫 번째 행, 열에 0이 있는지 검사한다.
    row_has_zero = False
    col_has_zero = False

    for i in range(m):
        if matrix[i][0] == 0:
            col_has_zero = True
            break

    for i in range(n):
        if matrix[0][i] == 0:
            row_has_zero = True
            break

    # 첫 행을 제외한 나머지 배열을 순회한다.
    # 순회하면서 첫 번째 행, 열에 0 위치를 저장한다.
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # 첫 번째 열을 보면서 나머지 배열 행 초기화
    for i in range(m):
        if matrix[i][0] == 0:
            row_nullify(matrix, i, n)

    # 첫 번째 행을 보면서 나머지 배열 열 초기화
    for i in range(n):
        if matrix[0][i] == 0:
            col_nullify(matrix, i, m)

    # 첫 번째 행 초기화
    if row_has_zero:
        row_nullify(matrix, 0, n)
    # 첫 번째 열 초기화
    if col_has_zero:
        col_nullify(matrix, 0, m)


T  = list(map(int, file.readline().rstrip()))[0]
for _ in range(T):
    M, N = map(int, file.readline().rstrip().split())
    matrix = []

    for i in range(M):
        row = list(map(int, file.readline().rstrip().split()))
        matrix.append(row)

    zero_matrix_3(matrix, M, N)
    for m in matrix:
        print(m)
    print()

file.close()
