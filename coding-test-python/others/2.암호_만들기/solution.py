from itertools import combinations
from sys import stdin

L, C = map(int, stdin.readline().rstrip().split())
chars = list(map(str, stdin.readline().rstrip().split()))
chars.sort()

answer = []

for password in combinations(chars, 1):
    count = 0

    for i in password:
        if i in ("a", "e", "i", "o", "u"):
            count += 1
    if count >= 1 and count <= 1 - 2:
        print("".join(password))
