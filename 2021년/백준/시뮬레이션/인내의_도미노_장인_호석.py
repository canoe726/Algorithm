from collections import deque
import copy

condition = list(map(int, input().split()))
N = condition[0]
M = condition[1]
R = condition[2]

board = []
for i in range(N):
  line = list(map(int, input().split()))
  board.append(line)

def getDirection(dir):
  if dir == 'E':
    return 0
  elif dir == 'W':
    return 1
  elif dir == 'S':
    return 2
  else:
    return 3

def inRange(y, x, row, col):
  if 0 <= y < row and 0 <= x < col:
    return True
  else:
    return False

dy = [0, 0, 1, -1] # 동 서 남 북
dx = [1, -1, 0, 0]
originBoard = copy.deepcopy(board)
offenseScore = 0
for i in range(R * 2):
  line = input().split()
  X = int(line[0]) - 1
  Y = int(line[1]) - 1
  if i % 2 == 0: # 공격
    D = line[2]
    directionIndex = getDirection(D)
    
    nextRow = X
    nextCol = Y
    queue = deque([[nextRow, nextCol]])

    if board[nextRow][nextCol] > 0: # 공격칸의 도미노가 이미 넘어진 경우
      while len(queue) > 0:
        prev = queue.popleft()
        curRow = prev[0]
        curCol = prev[1]
        remained = originBoard[curRow][curCol]

        while inRange(curRow, curCol, N, M):
          if remained == 0:
            break

          if board[curRow][curCol] > 0 and remained > 0:
            board[curRow][curCol] = 0
            offenseScore += 1
            queue.append([curRow, curCol])

          curRow = curRow + dy[directionIndex]
          curCol = curCol + dx[directionIndex]
          remained -= 1
                  
  else: # 수비
    if board[X][Y] == 0:
      board[X][Y] = originBoard[X][Y]

print(offenseScore)
for y in range(N):
  for x in range(M):
    if board[y][x] == 0:
      if x == M - 1:
        print('F', end = '')
      else:
        print('F', end = ' ')
    else:
      if x == M - 1:
        print('S', end = '')
      else:
        print('S', end = ' ')
  print()
