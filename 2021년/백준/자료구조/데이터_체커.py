import sys
n = int(input())

circles = []
for i in range(n):
  inp = sys.stdin.readline().split()
  x = int(inp[0])
  r = int(inp[1])
  circles.append([x - r, i, 0]) # 시작, 아이디, 열림
  circles.append([x + r, i, 1]) # 끝, 아이디, 닫힘
circles.sort()

answer = True
stack = []
for circle in circles:
  top = circle
  id = top[1]
  isOpen = top[2]

  if (isOpen == 0):
    stack.append(top)
  else:
    sTop = stack.pop()
    if (id != sTop[1] or top[2] != 1):
      answer = False
      break

if (answer):
  print("YES")
else:
  print("NO")
