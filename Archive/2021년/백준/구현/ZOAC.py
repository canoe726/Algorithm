import sys
input = sys.stdin.readline

str = input().rstrip()

def getAlphabet(ch):
  return chr(ch)

def solution(str):
  showStr = [False] * len(str)
  printed = 0
  lasts = [0]
  while printed != len(showStr):
    findAlpha = False
    for alpha in range(65, 65 + 26):
      if findAlpha:
        break
      else:
        lastIdx = lasts[-1]
        for idx in range(lastIdx, len(str)):
          if showStr[idx]:
            continue
          if str[idx] == getAlphabet(alpha):
            lasts.append(idx)
            showStr[idx] = True
            findAlpha = True
            break

    if findAlpha:
      for idx in range(len(str)):
        if showStr[idx]:
          print(str[idx], end = '')
      print()
      printed += 1
    else:
      if len(lasts) == 0:
        lasts = [0]
        lastIdx = 0
      else:
        lasts.pop()
  
solution(str)
