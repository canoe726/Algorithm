N = 5  # 데이터의 개수
M = 5  # 찾으려는 부분합
data = [1, 2, 3, 2, 5]


def prefix_sum(data, M):
    count = 0
    interval_sum = 0
    end = 0

    for start in range(len(data)):
        while interval_sum < M and end < N:
            interval_sum += data[end]
            end += 1

        if interval_sum == M:
            count += 1

        interval_sum -= data[start]

    return count


print(prefix_sum(data, M))
