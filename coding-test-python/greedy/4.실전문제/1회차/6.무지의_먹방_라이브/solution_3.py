def heap_push(heap, data):
    heap.append(data)
    current = len(heap) - 1

    while current > 0:
        parent = (current - 1) // 2

        if heap[parent] > heap[current]:
            heap[parent], heap[current] = heap[current], heap[parent]
            current = parent
        else:
            break


def heap_pop(heap):
    if not heap:
        return None
    if len(heap) == 1:
        return heap.pop()

    pop_data, heap[0] = heap[0], heap.pop()
    current, child = 0, 1

    while child < len(heap):
        sibling = child + 1

        if sibling < len(heap) and heap[child] > heap[sibling]:
            child = sibling
        if heap[current] > heap[child]:
            heap[current], heap[child] = heap[child], heap[current]
            current = child
            child = current * 2 + 1
        else:
            break

    return pop_data


def solution(food_times, k):
    answer = 0
    heap = []

    for i in range(len(food_times)):
        heap_push(heap, (food_times[i], i + 1))

    base = 0
    while heap:
        size = len(heap)
        food_time, food_num = heap_pop(heap)

        if k >= (food_time - base) * size:
            k -= (food_time - base) * size
            base += food_time - base
        else:
            heap_push(heap, ((food_time - base), food_num))
            break

    result = []
    while heap:
        food_time, food_num = heap_pop(heap)
        result.append((food_num, food_time))
    result.sort()

    if len(result) > 0:
        answer = result[k % len(result)][0]
    else:
        answer = -1

    return answer
