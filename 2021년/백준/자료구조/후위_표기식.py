str = input()

answer = ''
stack = []
for s in str:
  if (s == '('):
    stack.append('(')
  elif (s == ')'):
    while(len(stack)):
      top = stack.pop()
      if (top == '('):
        break
      else:
        answer += top
  elif (s == '+' or s == '-' or s == '*' or s == '/'):
    if (len(stack) == 0):
      stack.append(s)
    else:
      if (s == '+' or s == '-'):
        while (len(stack)):
          t = stack.pop()
          if (t == '+' or t == '-' or t == '*' or t == '/'):
            answer += t
          else:
            stack.append(t)
            break
        stack.append(s)
      else:
        while (len(stack)):
          t = stack.pop()
          if (t == '*' or t == '/'):
            answer += t
          else:
            stack.append(t)
            break
        stack.append(s)
  else:
    answer += s

while(len(stack)):
  top = stack.pop()
  answer += top

print(answer)
