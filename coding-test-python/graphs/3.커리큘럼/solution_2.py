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

        if self.front == None:
            self.front = new_node
            self.rear = new_node
            return

        self.rear.next = new_node
        self.rear = self.rear.next

    def dequeue(self):
        if self.is_empty():
            return None

        if self.front == self.rear:
            data = self.front.data
            self.front = None
            self.rear = None
            return data

        removed = self.front
        self.front = self.front.next

        return removed.data


answer = 0
INF = int(1e9)

N = list(map(int, file.readline().rstrip().split()))[0]

in_degree = [0 for _ in range(N + 1)]
times = [0 for _ in range(N + 1)]
graphs = [[] for _ in range(N + 1)]

for i in range(1, N + 1):
    row = list(map(int, file.readline().rstrip().split()))

    times[i] = row[0]
    for x in row[1:-1]:
        in_degree[i] += 1
        graphs[x].append(i)


def topology_sort():
    result = [0 for _ in range(N + 1)]
    for i in range(N + 1):
        result[i] = times[i]

    queue = Queue()
    for i in range(1, N + 1):
        if in_degree[i] == 0:
            queue.enqueue(i)

    while True:
        node = queue.dequeue()
        if node == None:
            break

        for n in graphs[node]:
            result[n] = max(result[n], result[node] + times[n])
            in_degree[n] -= 1

            if in_degree[n] == 0:
                queue.enqueue(n)

    for i in range(1, N + 1):
        print(result[i])


topology_sort()

file.close()
