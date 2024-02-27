import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")

nums = list(map(int, file.readline().rstrip().split()))


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
        return "Empty"
    if len(heap) == 1:
        return heap.pop()

    pop_data, heap[0] = heap[0], heap.pop()
    current, child = 0, 1

    while child < len(heap):
        sibling = child + 1

        if sibling < len(heap) and heap[child] > heap[sibling]:
            current = sibling
        if heap[current] > heap[child]:
            heap[current], heap[child] = heap[child], heap[current]
            current = child
            child = current * 2 + 1
        else:
            break

    return pop_data


heap_push(nums, 2)
print(heap_pop(nums))
print(heap_pop(nums))
print(heap_pop(nums))

file.close()
