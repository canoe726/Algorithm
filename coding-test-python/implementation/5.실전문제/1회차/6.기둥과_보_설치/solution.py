def possible(frames):
    for x, y, a in frames:
        # 기둥 검사
        if a == 0:
            if (
                y == 0
                or [x, y - 1, 0] in frames
                or [x - 1, y, 1] in frames
                or [x, y, 1] in frames
            ):
                continue
            else:
                return False

        # 보 검사
        if a == 1:
            if (
                ([x - 1, y, 1] in frames and [x + 1, y, 1] in frames)
                or [x, y - 1, 0] in frames
                or [x + 1, y - 1, 0] in frames
            ):
                continue
            else:
                return False

    return True


def solution(n, build_frame):
    answer = []

    for frame in build_frame:
        x, y, a, b = frame

        # 삭제
        if b == 0:
            answer.remove([x, y, a])
            if not possible(answer):
                answer.append([x, y, a])
        # 설치
        if b == 1:
            answer.append([x, y, a])
            if not possible(answer):
                answer.remove([x, y, a])

    return sorted(answer)
