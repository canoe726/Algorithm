from datetime import datetime
import math
import sys
input = sys.stdin.readline

def getRangeTime(time):
  time = time.split('/')
  days = int(time[0])
  time = time[1].split(':')
  hh = int(time[0])
  mm = int(time[1])
  return ((days * 24 * 60) + (hh * 60) + mm)

def getTimeDiff(start, end):
  fmt = '%Y-%m-%d %H:%M'
  d1 = datetime.strptime(start, fmt)
  d2 = datetime.strptime(end, fmt)  
  return math.floor((d2 - d1).total_seconds() / 60)

condition = input().rstrip().split()
loop = int(condition[0])
bTime = getRangeTime(condition[1])
fine = int(condition[2])

borrows = {}

for i in range(loop):
  borrow = input().rstrip().split()
  time = (borrow[0] + ' ' + borrow[1])
  device = borrow[2]
  person = borrow[3]

  if not person in borrows:
    borrows[person] = { 'cost': 0 }
  if not device in borrows[person]:
    borrows[person][device] = []

  bList = borrows[person][device]
  if (len(bList) < 2):
    borrows[person][device].append(time)
  if (len(bList) == 2):
    diff = getTimeDiff(bList[0], bList[1])
    if diff > bTime:
      newCost = (diff - bTime) * fine
      borrows[person]['cost'] += newCost
    borrows[person][device] = []

persons = borrows.keys()
persons = sorted(list(persons))
for person in persons:
  devices = borrows[person].keys()
  for device in devices:
    if device == 'cost':
      continue
    bList = borrows[person][device]
    if (len(bList) == 2):
      diff = getTimeDiff(bList[0], bList[1])
      if diff > bTime:
        newCost = (diff - bTime) * fine
        borrows[person]['cost'] += newCost
      borrows[person][device] = []

isAllZero = True
for person in persons:
  cost = borrows[person]['cost']
  if cost > 0:
    isAllZero = False
    print(person, cost)

if isAllZero:
  print(-1)
