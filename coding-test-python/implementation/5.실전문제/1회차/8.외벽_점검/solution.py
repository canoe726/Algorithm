import copy
from itertools import permutations

INF = 987654312


def solution(n, weak, dist):
    new_weak = [0] * (len(weak) * 2)
    answer = INF

    # 레스토랑을 일렬로 만든다
    for i in range(len(weak)):
        new_weak[i] = weak[i]
    for i in range(len(weak), len(weak) * 2):
        new_weak[i] = n + weak[i - len(weak)]

    # 친구가 점검할 수 있는 경우의 수
    friends = []
    for friend in permutations(dist, len(dist)):
        friends.append(friend)

    for i in range(len(new_weak) - len(weak) + 1):
        chunk = new_weak[i : i + len(weak)]

        for friend in friends:
            f_idx = 0
            valid = True
            last_weak = chunk[0] + friend[f_idx]

            for c_idx in range(1, len(chunk)):
                cur_chunk = chunk[c_idx]

                if last_weak < cur_chunk:
                    f_idx += 1

                    if f_idx >= len(friend):
                        valid = False
                        break
                    last_weak = chunk[c_idx] + friend[f_idx]

            if valid:
                answer = min(answer, f_idx + 1)

    if answer == INF:
        return -1

    return answer
