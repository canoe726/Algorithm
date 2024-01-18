import sys
from functools import cmp_to_key
input=sys.stdin.readline

def compare(a, b):
  if (a[1] == b[1]):
    return a[0] - b[0]
  return b[1] - a[1]

L, N, Rf, Rb = map(int, input().split())
trails = []
for i in range(N):
  trail = list(map(int, input().split()))
  trails.append(trail)

answer = 0
prevXi = 0
fSec = 0
bSec = 0

sortedTrails = sorted(trails, key=cmp_to_key(compare))

for trail in sortedTrails:
  Xi,Ci = trail
  
  if (Xi < prevXi):
    continue

  distance = (Xi - prevXi)

  fSec += (distance * Rf)
  bSec += (distance * Rb)
  gap = fSec - bSec

  bSec += gap

  answer += gap * Ci
  prevXi = Xi

print(answer)
