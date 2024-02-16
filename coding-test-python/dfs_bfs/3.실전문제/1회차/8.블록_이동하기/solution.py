from collections import deque

moves = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def get_next_nodes(node, new_board):
    global moves

    left, right = node
    lx, ly = left
    rx, ry = right

    next_nodes = []

    # 이동
    for move in moves:
        mx, my = move
        nlx, nly = lx + mx, ly + my
        nrx, nry = rx + mx, ry + my

        if new_board[nlx][nly] == 1 or new_board[nrx][nry] == 1:
            continue

        next_nodes.append(((nlx, nly), (nrx, nry)))

    # 가로 회전
    if lx == rx:
        for h_rot in [-1, 1]:
            nlx, nly = lx + h_rot, ly
            nrx, nry = rx + h_rot, ry

            if new_board[nlx][nly] == 1 or new_board[nrx][nry] == 1:
                continue

            next_nodes.append(((lx, ly), (nlx, nly)))
            next_nodes.append(((rx, ry), (nrx, nry)))

    # 세로 회전
    if ly == ry:
        for v_rot in [-1, 1]:
            nlx, nly = lx, ly + v_rot
            nrx, nry = rx, ry + v_rot

            if new_board[nlx][nly] == 1 or new_board[nrx][nry] == 1:
                continue

            next_nodes.append(((lx, ly), (nlx, nly)))
            next_nodes.append(((rx, ry), (nrx, nry)))

    return next_nodes


def solution(board):
    N = len(board)

    # 블록 크기 재설정
    new_board = [[1] * (N + 2) for _ in range(N + 2)]
    for x in range(N):
        for y in range(N):
            new_board[x + 1][y + 1] = board[x][y]

    start_node = (((1, 1), (1, 2)), 0)
    queue = deque([start_node])
    visited = set()
    visited.add(((1, 1), (1, 2)))

    while queue:
        node, count = queue.popleft()
        left, right = node

        if left == (N, N) or right == (N, N):
            return count

        for next_node in get_next_nodes(node, new_board):
            if not next_node in visited:
                queue.append((next_node, count + 1))
                visited.add(next_node)

    return 0
