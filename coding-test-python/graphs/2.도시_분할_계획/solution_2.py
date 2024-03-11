import sys


def getFile(fileName):
    path = sys.argv[0].split("/")
    path.pop()
    filePath = "/".join(path)
    file = open(filePath + "/" + fileName, "r")
    return file


file = getFile("input")


def merge(arr, start, mid, end, comp):
    sorted = [0 for _ in range(len(arr))]
    s_idx = start
    left = start
    right = mid + 1

    while left <= mid and right <= end:
        if comp(arr[left]) <= comp(arr[right]):
            sorted[s_idx] = arr[left]
            left += 1
        else:
            sorted[s_idx] = arr[right]
            right += 1
        s_idx += 1

    if left > mid:
        for i in range(right, end + 1):
            sorted[s_idx] = arr[i]
            s_idx += 1
    else:
        for i in range(left, mid + 1):
            sorted[s_idx] = arr[i]
            s_idx += 1

    for i in range(start, end + 1):
        arr[i] = sorted[i]


def merge_sort(arr, start, end, comp=lambda elem: elem):
    if start < end:
        mid = (start + end) // 2
        merge_sort(arr, start, mid, comp)
        merge_sort(arr, mid + 1, end, comp)
        merge(arr, start, mid, end, comp)


def find_parent(parent, x):
    if parent[x] != x:
        parent[x] = find_parent(parent, parent[x])
    return parent[x]


def union_parent(parent, a, b):
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a > b:
        parent[a] = b
    else:
        parent[b] = a


answer = 0
INF = int(1e9)

N, M = list(map(int, file.readline().rstrip().split()))

edges = []
parents = [0 for _ in range(N + 1)]
for i in range(N + 1):
    parents[i] = i

for i in range(M):
    A, B, C = list(map(int, file.readline().rstrip().split()))
    edges.append((C, A, B))

merge_sort(edges, 0, len(edges) - 1)

last = 0
for edge in edges:
    cost, start, end = edge

    if find_parent(parents, start) != find_parent(parents, end):
        union_parent(parents, start, end)
        answer += cost
        last = cost

print(answer - last)

file.close()
