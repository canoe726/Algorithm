n = str(input().rstrip())

cnt = 0
minValue = int(1e10)
maxValue = -1

def countOdd(num):
  cnt = 0
  for n in num:
    if int(n) % 2 == 1:
      cnt += 1
  return cnt

def solution(n, cnt):
  global minValue, maxValue
  cnt += countOdd(n)

  if len(n) == 1:
    minValue = min(minValue, cnt)
    maxValue = max(maxValue, cnt)
    return
  
  elif len(n) == 2:
    nextNum = str((int(n) // 10) + int(n) % 10)
    solution(nextNum, cnt)

  else:
    for start in range(1, len(n) - 1):
      for end in range(start + 1, len(n)):
        nextNum = str(int(n[:start]) + int(n[start:end]) + int(n[end:]))
        solution(nextNum, cnt)

solution(n, 0)
print(minValue, maxValue)
