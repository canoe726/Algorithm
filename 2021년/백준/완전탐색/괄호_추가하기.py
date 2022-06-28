import copy

N = int(input())
line = input().rstrip()

nums = []
operators = []
for l in line:
  if l == '+' or l == '-' or l == '*':
    operators.append(l)
  else:
    nums.append(int(l))

def calc(n1, op, n2):
  if op == '+':
    return n1 + n2
  if op == '-':
    return n1 - n2
  if op == '*':
    return n1 * n2

maxValue = 1e32 * -2
cnt = 0
def solution(nums, operators, start, orders):
  global maxValue
  global cnt
  if len(operators) == start:
    deleted = 0

    r_operators = copy.deepcopy(operators)
    r_nums = copy.deepcopy(nums)
    for order in orders:
      oIdx = order - deleted
      if oIdx < 0:
        oIdx = 0

      operator = r_operators.pop(oIdx)

      num1 = r_nums.pop(oIdx)
      num2 = r_nums[oIdx]
      r_nums[oIdx] = calc(num1, operator, num2)

      deleted += 1

    for i in range(len(r_operators)):
      oIdx = 0
      operator = r_operators.pop(oIdx)

      num1 = r_nums.pop(oIdx)
      num2 = r_nums[oIdx]
      r_nums[oIdx] = calc(num1, operator, num2)

    if r_nums[0] > maxValue:
      maxValue = r_nums[0]

    return

  for index in range(start, len(operators)):
    if len(orders) == 0:
      orders.append(index)
      solution(nums, operators, index + 1, orders)
      orders.pop()

      solution(nums, operators, index + 1, orders)
    else:
      if index - orders[-1] > 1:
        orders.append(index)
        solution(nums, operators, index + 1, orders)
        orders.pop()

      solution(nums, operators, index + 1, orders)

solution(nums,  operators, 0, [])
print(maxValue)
