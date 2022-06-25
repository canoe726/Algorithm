import sys
sys.setrecursionlimit(10**9)

N = int(input())

tree = {}
for n in range(N + 1):
  tree[n] = {
    'left': -1,
    'right': -1,
    'parent': -1,
  }

for n in range(N):
  node = list(map(int, input().split()))
  parent = node[0]
  left = node[1]
  right = node[2]
  
  tree[parent]['left'] = left
  tree[parent]['right'] = right
  if left != -1:
    tree[left]['parent'] = parent
  if right != -1:
    tree[right]['parent'] = parent

def inOrder(curNode, tree, visited, lastNode):
  left = tree[curNode]['left']
  right = tree[curNode]['right']

  if not visited[curNode]:
    if left != -1:
      inOrder(left, tree, visited, lastNode)
    visited[curNode] = True
    lastNode[0] = curNode
    if right != -1:
      inOrder(right, tree, visited, lastNode)

def myInOrder(curNode, tree, visited, cnt, last):
  lastNode = last[0]
  
  parent = tree[curNode]['parent']
  left = tree[curNode]['left']
  right = tree[curNode]['right']

  if left != -1 and not last[1] and not visited[left]:
    visited[left] = True
    cnt[0] += 1
    myInOrder(left, tree, visited, cnt, last)

  if right != -1 and not last[1] and not visited[right]:
    visited[right] = True
    cnt[0] += 1
    myInOrder(right, tree, visited, cnt, last)

  if lastNode == curNode:
    last[1] = True
    return

  if parent != -1 and not last[1] and parent in tree:
    cnt[0] += 1
    myInOrder(parent, tree, visited, cnt, last)

def solution(tree):
  cnt = [0]
  lastNode = [-1]
  visited = [False] * (N + 1)
  visited[0] = True
  inOrder(1, tree, visited, lastNode)

  visited = [False] * (N + 1)
  visited[0] = True
  myInOrder(1, tree, visited, cnt, [lastNode[0], False])
  print(cnt[0])

solution(tree)
