from sys import stdin
from itertools import combinations
import copy

N = list(map(int, stdin.readline().rstrip()))[0]

maps = []
o_pos = []
teachers = []
num_of_obstacle = 3
dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]

for _ in range(N):
    rows = list(map(str, stdin.readline().rstrip().split()))
    maps.append(rows)


for x in range(N):
    for y in range(N):
        o_pos.append((x, y))

        if maps[x][y] == "T":
            teachers.append((x, y))


def copy_map(maps, pos):
    global num_of_obstacle

    temp_map = copy.deepcopy(maps)
    o_count = 0

    for p in pos:
        ox, oy = p

        if temp_map[ox][oy] == "X":
            temp_map[ox][oy] = "O"
            o_count += 1
        else:
            break

    if o_count != num_of_obstacle:
        return None

    return temp_map


def find_answer(maps, o_pos, teachers):
    global dirs

    for comb in combinations(o_pos, 3):
        # 장애물 배치
        temp_map = copy_map(maps, comb)
        if temp_map == None:
            continue

        # 선생님들 순회
        s_count = 0
        for teacher in teachers:
            tx, ty = teacher

            for dir in dirs:
                dx, dy = dir
                nx, ny = tx + dx, ty + dy

                while nx >= 0 and nx < N and ny >= 0 and ny < N:
                    if temp_map[nx][ny] == "O":
                        break
                    if temp_map[nx][ny] == "S":
                        s_count += 1

                    nx += dx
                    ny += dy

        if s_count == 0:
            return "YES"

    return "NO"


print(find_answer(maps, o_pos, teachers))
