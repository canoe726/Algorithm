n = int(input());
num = list(map(int, input().split()));

answer = []
stack = []
idxStack = []
for i in range(n):
  while (len(stack) > 0):
    top = stack.pop()
    idx = idxStack.pop()
    if (top > num[i]):
      stack.append(top)
      idxStack.append(idx)
      answer.append(idx)
      break      

  if (len(stack) == 0):
    answer.append(0)
  stack.append(num[i])
  idxStack.append(i + 1)
  
for ans in answer:
  print(ans)

