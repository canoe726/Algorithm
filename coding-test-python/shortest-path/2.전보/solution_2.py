import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


class Heap:
    def __init__(self):
        self.heap = []
        self.length = 0

    def __len__(self):
        return self.length

    def __str__(self):
        if self.length == 0:
            return ""

        result = "["
        for i in range(self.length - 1):
            result += str(self.heap[i]) + ", "
        result += str(self.heap[i + 1]) + "]"
        return result

    def push(self, data):
        self.heap.append(data)
        self.length += 1
        cur = self.length - 1

        while cur > 0:
            parent = (cur - 1) // 2
            if self.heap[parent] > self.heap[cur]:
                self.heap[cur], self.heap[parent] = self.heap[parent], self.heap[cur]
            else:
                break
            cur = parent

    def pop(self):
        if self.length == 0:
            return None

        if self.length == 1:
            self.length -= 1
            pop_data = self.heap.pop()
            return pop_data

        pop_data, self.heap[0] = self.heap[0], self.heap.pop()
        root = 0
        self.length -= 1

        while root < self.length:
            left = root * 2 + 1
            right = left + 1
            child = left

            if left >= self.length or right >= self.length:
                break

            if self.heap[left] > self.heap[right]:
                child = right

            if self.heap[root] > self.heap[child]:
                self.heap[root], self.heap[child] = self.heap[child], self.heap[root]
                root = child
            else:
                break

        return pop_data


answer = 0
INF = int(1e9)
N, M, C = list(map(int, file.readline().rstrip().split()))
dist = [INF] * (N + 1)
graphs = [[] for _ in range(N + 1)]

for _ in range(M):
    X, Y, Z = list(map(int, file.readline().rstrip().split()))
    graphs[X].append((Y, Z))


def dijkstra(node):
    dist[node] = 0

    heap = Heap()
    heap.push((0, node))

    while len(heap) > 0:
        cur_dist, cur_node = heap.pop()

        if dist[cur_node] < cur_dist:
            continue

        for g in graphs[cur_node]:
            end, cost = g

            value = dist[cur_node] + cost
            if dist[end] > value:
                dist[end] = value
                heap.push((value, end))


dijkstra(C)

time = 0
count = 0
for i in range(1, N + 1):
    if i != C:
        count += 1
        time = max(time, dist[i])

print(count, time)
file.close()
