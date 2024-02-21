from sys import stdin
import copy

answer = 0

N = 4
# (번호, 방향), 0:빈칸, 99:상어
maps = [[0] * N for _ in range(N)]

for i in range(N):
    row = list(map(int, stdin.readline().rstrip().split()))

    for j in range(N):
        maps[i][j] = [row[j * 2], row[j * 2 + 1] - 1]

dirs = [(-1, 0), (-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1)]
dir_size = 8


def move_fish(shark_pos, maps):
    sx, sy = shark_pos

    for cnt in range(1, 17):
        fish = None
        for i in range(N):
            for j in range(N):
                if maps[i][j][0] == cnt:
                    fish = [maps[i][j][0], maps[i][j][1], i, j]

        if fish == None:
            continue

        fn, fd, fx, fy = fish

        for rotate in range(dir_size):
            next_dir = (fd + rotate) % dir_size
            ndx, ndy = dirs[next_dir]
            nfx, nfy = fx + ndx, fy + ndy

            if nfx < 0 or nfx >= N or nfy < 0 or nfy >= N:
                continue
            if nfx == sx and nfy == sy:
                continue

            maps[fx][fy] = [fn, next_dir]
            maps[fx][fy], maps[nfx][nfy] = maps[nfx][nfy], maps[fx][fy]
            break


def move_shark(shark_pos, maps):
    moves = []

    sx, sy = shark_pos
    sn, sd = maps[sx][sy]
    sdx, sdy = dirs[sd]
    nsx, nsy = sx, sy

    for i in range(1, N + 1):
        nsx += sdx
        nsy += sdy

        if nsx < 0 or nsx >= N or nsy < 0 or nsy >= N:
            continue
        if maps[nsx][nsy][0] < 1 or maps[nsx][nsy][0] > 16:
            continue

        moves.append([nsx, nsy])

    return moves


def dfs(shark_pos, input_maps, total):
    maps = copy.deepcopy(input_maps)

    # 물고기 먹기
    sx, sy = shark_pos
    total += maps[sx][sy][0]
    maps[sx][sy][0] = 0

    # 물고기 이동
    move_fish(shark_pos, maps)

    # 상어 이동
    moves = move_shark(shark_pos, maps)

    if len(moves) == 0:
        global answer
        answer = max(answer, total)
    else:
        for move in moves:
            mx, my = move

            dfs([mx, my], maps, total)


dfs([0, 0], maps, 0)

print(answer)
