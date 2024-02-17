def solution(N, stages):
    answer = []

    stages.sort()
    total = len(stages)

    success = []
    for idx in range(N + 2):
        success.append((0, idx))

    s = stages[0]
    count = 1
    for idx in range(1, len(stages)):
        ns = stages[idx]

        if s == ns:
            count += 1
        else:
            success[s] = (count / total, s)
            total -= count
            s = ns
            count = 1

    if count > 0:
        success[s] = (count / total, s)

    success = success[1 : (N + 1)]
    success.sort(key=lambda x: (-(x[0]), x[1]))

    for s_idx in range(len(success)):
        answer.append(success[s_idx][1])

    return answer
