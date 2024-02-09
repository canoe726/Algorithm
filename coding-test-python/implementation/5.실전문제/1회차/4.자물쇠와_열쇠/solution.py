import copy


def rotateClockwise90(arr):
    n = len(arr)
    dist = [[0] * n for _ in range(n)]

    for r in range(n):
        for c in range(n):
            dist[c][n - r - 1] = arr[r][c]

    return dist


def rotateClockwise(arr, count):
    rotated = copy.deepcopy(arr)
    for i in range(count):
        rotated = rotateClockwise90(rotated)

    return rotated


def solution(key, lock):
    answer = False
    key_size = len(key)
    lock_size = len(lock)
    map_size = key_size * 2 + lock_size
    new_map = [[1] * map_size for _ in range(map_size)]
    new_key_map = [[0] * map_size for _ in range(map_size)]

    # 모든 표면이 돌기인지 검사
    count = 0
    for x in range(lock_size):
        for y in range(lock_size):
            if lock[x][y] == 0:
                count += 1

    if count == 0:
        return True

    # 맵 정중앙에 초기화
    for x in range(lock_size):
        for y in range(lock_size):
            new_map[key_size + x][key_size + y] = lock[x][y]

    # 돌리면서 검사
    for x in range(map_size - key_size + 1):
        for y in range(map_size - key_size + 1):
            temp_key_map = copy.deepcopy(new_key_map)

            for rotate in range(4):
                rotated = rotateClockwise(key, rotate)

                for i in range(key_size):
                    for j in range(key_size):
                        temp_key_map[x + i][y + j] = rotated[i][j]

                count = 0
                for i in range(lock_size):
                    for j in range(lock_size):
                        cx = key_size + i
                        cy = key_size + j

                        if (temp_key_map[cx][cy] == 0 and new_map[cx][cy] == 1) or (
                            temp_key_map[cx][cy] == 1 and new_map[cx][cy] == 0
                        ):
                            count += 1

                if count == lock_size * lock_size:
                    return True

    return answer
