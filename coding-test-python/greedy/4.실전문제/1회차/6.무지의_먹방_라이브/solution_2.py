import heapq


def solution(food_times, k):
    answer = 0
    heap = []

    for i in range(len(food_times)):
        heapq.heappush(heap, (food_times[i], i + 1))

    base = 0
    while heap:
        size = len(heap)
        food_time, food_num = heapq.heappop(heap)

        if k >= (food_time - base) * size:
            k -= (food_time - base) * size
            base += food_time - base
        else:
            heapq.heappush(heap, ((food_time - base), food_num))
            break

    result = []
    while heap:
        food_time, food_num = heapq.heappop(heap)
        result.append((food_num, food_time))
    result.sort()

    if len(result) > 0:
        answer = result[k % len(result)][0]
    else:
        answer = -1

    return answer
