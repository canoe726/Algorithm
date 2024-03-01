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
        self.length = 0

    def __len__(self):
        return self.length

    def enqueue(self, data):
        node = Node(data)
        self.length += 1

        if self.front == None:
            self.front = node
            self.rear = node
            return

        self.rear.next = node
        self.rear = self.rear.next

    def dequeue(self):
        node = self.front

        if node == None:
            return None

        self.length -= 1

        if node == self.rear:
            self.front = None
            self.rear = None

            return node.data

        self.front = self.front.next

        return node.data


answer = 0

N, M = map(int, file.readline().rstrip().split())
maps = []

for _ in range(N):
    row = list(map(int, map(str, file.readline().rstrip())))
    maps.append(row)

pos = [0, 0, 0]
visited = [[False] * M for _ in range(N)]
dirs = [(-1, 0), (0, 1), (1, 0), (0, -1)]


def bfs(x, y):
    min_dist = 0
    queue = Queue()
    queue.enqueue((x, y, 1))

    while len(queue):
        cx, cy, cd = queue.dequeue()

        if cx == N - 1 and cy == M - 1:
            min_dist = cd
            break

        for dir in dirs:
            dx, dy = dir
            nx, ny = cx + dx, cy + dy

            if nx < 0 or nx >= N or ny < 0 or ny >= M:
                continue
            queue.enqueue((nx, ny, cd + 1))

    return min_dist


print(bfs(0, 0))

file.close()
