import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Queue:
    def __init__(self):
        self.front = None
        self.rear = None

    def is_empty(self):
        return self.front == None

    def enqueue(self, data):
        new_node = Node(data)

        if self.is_empty():
            self.front = new_node
            self.rear = new_node
            return

        self.rear.next = new_node
        self.rear = self.rear.next

    def dequeue(self):
        if self.is_empty():
            return None

        removed = self.front
        if self.front == self.rear:
            self.front = None
            self.rear = None
            return removed.data

        self.front = self.front.next

        return removed.data


answer = 0
INF = int(1e9)

N = list(map(int, file.readline().rstrip().split()))[0]

graphs = [[] for _ in range(N + 1)]
in_degree = [0 for _ in range(N + 1)]
times = [0 for _ in range(N + 1)]

for i in range(1, N + 1):
    row = list(map(int, file.readline().rstrip().split()))
    times[i] = row[0]

    for x in row[1:-1]:
        graphs[x].append(i)
        in_degree[i] += 1


def topology_sort():
    queue = Queue()
    result = [0 for _ in range(N + 1)]
    for i in range(N + 1):
        result[i] = times[i]

    for i in range(N + 1):
        if in_degree[i] == 0:
            queue.enqueue(i)

    while True:
        node = queue.dequeue()
        if node == None:
            break

        for next_node in graphs[node]:
            in_degree[next_node] -= 1
            result[next_node] = max(result[next_node], result[node] + times[next_node])

            if in_degree[next_node] == 0:
                queue.enqueue(next_node)

    for i in range(1, N + 1):
        print(result[i])


topology_sort()

file.close()
