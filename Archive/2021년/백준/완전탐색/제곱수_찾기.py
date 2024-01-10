NM = list(map(int, input().split()))
N = NM[0]
M = NM[1]

table = []
for n in range(N):
  table.append(input())

def isSquare(num):
  n = (num ** 0.5)
  if n % 1 == 0:
    return (n ** 2) == num
  else:
    return False

maxValue = -1
for rPos in range(N):
  for cPos in range(M):

    for n in range(-N, N):
      for m in range(-M, M):

        y = rPos
        x = cPos
        number = ''
        while 0 <= y < N and 0 <= x < M:
          number += table[y][x]
          if isSquare(int(number)):
            if int(number) > maxValue:
              maxValue = int(number)
          if n == 0 and m == 0:
            break
          y += n
          x += m

print(maxValue)
