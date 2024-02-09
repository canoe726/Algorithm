import heapq


def solution(food_times, k):
    if sum(food_times) <= k:
        return -1

    queue = []
    for i in range(len(food_times)):
        heapq.heappush(queue, (food_times[i], i + 1))

    food_len = len(queue)
    prev_amount = 0
    while True:
        cur_food, cur_index = heapq.heappop(queue)
        amount = cur_food - prev_amount

        if amount * food_len >= k:
            heapq.heappush(queue, (cur_food, cur_index))
            break

        k -= amount * food_len
        prev_amount += amount
        food_len -= 1

    remains = []
    while len(queue):
        remains.append(heapq.heappop(queue))

    remains.sort(key=lambda x: x[1])

    answer = remains[k % food_len][1]
    return answer
