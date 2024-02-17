def get_idx(arr, my_query):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if my_query <= arr[mid]:
            right = mid - 1
        else:
            left = mid + 1

    return left


def get_count(arr, query):
    left = get_idx(arr[len(query)], query.replace("?", "a"))
    right = get_idx(arr[len(query)], query.replace("?", "z"))

    return right - left


def solution(words, queries):
    answer = [0] * len(queries)

    MAX_SIZE = 10001
    arr = [[] for _ in range(MAX_SIZE)]
    reversed_arr = [[] for _ in range(MAX_SIZE)]

    for word in words:
        arr[len(word)].append(word)
        reversed_arr[len(word)].append(word[::-1])

    for idx in range(MAX_SIZE):
        arr[idx].sort()
        reversed_arr[idx].sort()

    for q_idx in range(len(queries)):
        query = queries[q_idx]

        # 접미사 검색
        if query[0] != "?":
            answer[q_idx] = get_count(arr, query)
        # 접두사 검색
        else:
            answer[q_idx] = get_count(reversed_arr, query[::-1])

    return answer
