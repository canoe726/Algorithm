from sys import stdin

N, M, K = map(int, stdin.readline().rstrip().split())
INF = 999


# [번호, 방향, x좌표, y좌표]
def get_shark_pos(maps, number):
    shark_pos = None

    for i in range(N):
        for j in range(N):
            if maps[i][j][0] == number:
                shark_pos = [number, maps[i][j][1], i, j]
    return shark_pos


# [상어 번호, 상어 방향, 상어 냄새번호, 남은 냄새시간], 빈칸 번호: INF, 방향이 없으면 -1
maps = [[0] * N for _ in range(N)]
dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

for i in range(N):
    row = list(map(int, stdin.readline().rstrip().split()))

    for j in range(N):
        num = row[j]
        if row[j] == 0:
            num = INF
        maps[i][j] = [num, -1, 0, 0]


shark_init_dirs = list(map(int, stdin.readline().rstrip().split()))
for s_idx in range(M):
    pos = get_shark_pos(maps, s_idx + 1)
    if pos != None:
        sn, sd, sx, sy = pos
        maps[sx][sy][1] = shark_init_dirs[s_idx] - 1


# i,j = [상어번호][방향] = [4방향 우선순위]
shark_dirs = [[0] * 4 for _ in range(M + 1)]

for i in range(1, M + 1):
    for j in range(4):
        row = list(map(int, stdin.readline().rstrip().split()))
        shark_dirs[i][j] = list(map(lambda x: x - 1, row))


def find_answer(maps):
    timer = 0
    EXIT_TIME = 1000

    while timer <= EXIT_TIME:
        shark_pos = []

        # 상어의 위치를 찾는다
        for s_idx in range(1, M + 1):
            pos = get_shark_pos(maps, s_idx)
            if pos != None:
                shark_pos.append(get_shark_pos(maps, s_idx))

        # 가장 강력한 상어만 남은 경우
        if len(shark_pos) == 1:
            break

        # 자기 위치에 냄새를 뿌린다
        for shark_p in shark_pos:
            sn, sd, sx, sy = shark_p
            maps[sx][sy] = [sn, sd, sn, K]

        # 모든 상어 이동
        for shark_p in shark_pos:
            sn, sd, sx, sy = shark_p
            s_dirs = shark_dirs[sn][sd]

            # 아무 냄새가 없는 방향을 찾는다
            no_smell = None
            for d_idx in range(4):
                dx, dy = dirs[s_dirs[d_idx]]
                nx, ny = sx + dx, sy + dy

                if nx < 0 or nx >= N or ny < 0 or ny >= N:
                    continue
                if maps[nx][ny][2] != 0:
                    continue
                # 현재 위치 및 방향 제거
                maps[sx][sy][0] = INF
                maps[sx][sy][1] = -1
                no_smell = [nx, ny, s_dirs[d_idx]]
                break
            if no_smell != None:
                no_smell_x, no_smell_y, no_smell_dir = no_smell
                # 이동, 만약 번호가 작은 상어가 있으면 잡아먹힘
                next_sn = maps[no_smell_x][no_smell_y][0]
                if sn < next_sn:
                    maps[no_smell_x][no_smell_y][0] = sn
                    maps[no_smell_x][no_smell_y][1] = no_smell_dir
                continue

            # 자신의 냄새가 있는 방향을 찾는다
            my_smell = None
            for d_idx in range(4):
                dx, dy = dirs[s_dirs[d_idx]]
                nx, ny = sx + dx, sy + dy

                if nx < 0 or nx >= N or ny < 0 or ny >= N:
                    continue
                if maps[nx][ny][2] != sn:
                    continue
                # 현재 위치 및 방향 제거
                maps[sx][sy][0] = INF
                maps[sx][sy][1] = -1
                my_smell = [nx, ny, s_dirs[d_idx]]
                break
            if my_smell != None:
                my_smell_x, my_smell_y, my_smell_dir = my_smell
                # 이동, 만약 번호가 작은 상어가 있으면 잡아먹힘
                next_sn = maps[my_smell_x][my_smell_y][0]
                if sn < next_sn:
                    maps[my_smell_x][my_smell_y][0] = sn
                    maps[my_smell_x][my_smell_y][1] = my_smell_dir
                continue

            # 그 외의 경우 범위 내 우선순위가 높은 곳으로 이동
            for d_idx in range(4):
                dx, dy = dirs[s_dirs[d_idx]]
                nx, ny = sx + dx, sy + dy

                if nx < 0 or nx >= N or ny < 0 or ny >= N:
                    continue

                # 현재 위치 및 방향 제거
                maps[sx][sy][0] = INF
                maps[sx][sy][1] = -1
                # 이동, 만약 번호가 작은 상어가 있으면 잡아먹힘
                next_sn = maps[nx][ny][0]
                if sn < next_sn:
                    maps[nx][ny][0] = sn
                    maps[nx][ny][1] = s_dirs[d_idx]
                break

        # 모든 냄새를 1만큼 지운다
        for i in range(N):
            for j in range(N):
                if maps[i][j][3] > 0:
                    maps[i][j][3] -= 1

                if maps[i][j][3] == 0:
                    maps[i][j][2] = 0

        timer += 1

    return timer


timer = find_answer(maps)

if timer > 1000:
    print(-1)
else:
    print(timer)
