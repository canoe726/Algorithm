src = input().rstrip()
dst = input().rstrip()

def change(src, dst, canChange):
  if canChange[0]:
    return
  if len(src) > len(dst):
    return
  if src == dst:
    canChange[0] = True
    return
  if len(dst) > 0 and dst[-1] == 'A':
    change(src, dst[:-1], canChange)
  if len(dst) > 0 and dst[0] == 'B':
    change(src, (dst[1:])[::-1], canChange)

def solution(src, dst):
  canChange = [False]
  change(src, dst, canChange)

  if canChange[0]:
    print(1)
  else:
    print(0)

solution(src, dst)

