from itertools import permutations

dy = [-1, 0, 1,  0] # 상 우 하 좌
dx = [ 0, 1, 0, -1]

condition = list(map(int, input().split()))
N = condition[0]
H = condition[1]
D = condition[2]

board = []
for i in range(N):
  board.append(input())

sy = sx = 0
ey = ex = 0
umbrella = []
for y in range(N):
  for x in range(N):
    if board[y][x] == 'S':
      sy, sx = y, x
    if board[y][x] == 'E':
      ey, ex = y, x
    if board[y][x] == 'U':
      umbrella.append([y, x])

def getDist(pos1, pos2):
  posY1, posX1 = pos1
  posY2, posX2 = pos2
  return abs(posY1 - posY2) + abs(posX1 - posX2)

def inRange(y, x, size):
  if 0 <= y < size and 0 <= x < size:
    return True
  else:
    return False

def getPerm(nums, pick):
  return list(permutations(nums, pick))

answer = 9876543210
size = len(umbrella)
for i in range(0, size + 1):
  hp = H
  perm = getPerm(list(range(size)), i)
  print('perm: ',perm)

  dist = 0
  pos = [sy, sx]
  for p in perm:
    if p:
      for loc in p:
        dist += getDist(pos, umbrella[loc])
        pos = umbrella[loc]
  dist += getDist(pos, [ey, ex])
  
  if hp > dist:
    answer = min(answer, dist)

print(answer)
  # print(len(getPerm([1,2,3,4,5,6,7,8,9,10], i)))

# print(len(list(permutations([1,2,3,4,5,6,7,8,9,10], 2))))

# print(getDist([0,1], [1,1]))
# print((list(itertools.permutations([1, 2, 3]))))








