import sys
from functools import cmp_to_key

path = sys.argv[0].split("/")
path.pop()
filePath = "/".join(path)

input = sys.stdin.readline

answer = 0

file = open(filePath + "/" + "input", "r")

N, M = map(int, file.readline().split())
cards = []

for i in range(N):
    cardItems = list(map(int, file.readline().split()))
    cards.append(cardItems)

maxValue = -1

for cardRow in cards:
    minValue = 99999

    for card in cardRow:
        minValue = min(card, minValue)

    if minValue > maxValue:
        maxValue = minValue

answer = maxValue

print(answer)
